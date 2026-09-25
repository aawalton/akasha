import { expect, test } from "bun:test"
import {
  reachedBrokenIn,
  webAppHealthFor,
} from "akasha/infrastructure/service/akasha-service/web-app/modules/host-answering/host-answering.module.code.ts"

test("a host name answering below 500 is well, a redirect among them", () => {
  expect(reachedBrokenIn("tempereso.com", { status: 200 })).toBe(null)
  expect(reachedBrokenIn("atlas.alanwalton.com", { status: 302 })).toBe(null)
  expect(reachedBrokenIn("webhook.alanwalton.com", { status: 404 })).toBe(null)
})

test("a host name answering 500 or above is broken with the status it answered", () => {
  expect(reachedBrokenIn("tempereso.com", { status: 530 })).toBe(
    "https://tempereso.com/ answered 530"
  )
})

test("a host name that could not be reached is broken with why", () => {
  expect(reachedBrokenIn("tempereso.com", { why: "timed out" })).toBe(
    "https://tempereso.com/ could not be reached: timed out"
  )
})

test("each web app is asked for at every host name routed to its workload, and broken by any", async () => {
  const asked: string[] = []
  const health = await webAppHealthFor(process.cwd(), (url) => {
    asked.push(url)
    return Promise.resolve(url === "https://www.tempereso.com/" ? { status: 530 } : { status: 200 })
  })
  const temper = health.find((one) => one.slug === "temper-web")
  expect(temper?.pagePath).toEndWith("temper-web.web-app.ts")
  expect(temper?.broken).toBe("https://www.tempereso.com/ answered 530")
  expect(health.find((one) => one.slug === "alanwalton-atlas-web")?.broken).toBe(null)
  expect(asked).toContain("https://tempereso.com/")
  expect(asked).toContain("https://atlas.alanwalton.com/")
  expect(asked).not.toContain("https://dev.tempereso.com/")
})
