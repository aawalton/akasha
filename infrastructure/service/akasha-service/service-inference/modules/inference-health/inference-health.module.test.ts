import { expect, test } from "bun:test"
import { inferenceHealthFor } from "akasha/infrastructure/service/akasha-service/service-inference/modules/inference-health/inference-health.module.code.ts"

const ANSWERED = [
  'active {"resident":["kokoro"]}',
  "answer traffic-cop 404",
  "answer kokoro 200",
  "answer ollama 000",
].join("\n")

function brokenOf(health: readonly { slug: string; broken: string | null }[], slug: string) {
  return health.find((one) => one.slug === slug)?.broken
}

test("a host is asked once, for the cop's residents and whether each service answers on its own port", async () => {
  const asked: string[] = []
  const reached: string[] = []
  await inferenceHealthFor(process.cwd(), (target, script) => {
    reached.push(target.host)
    asked.push(script)
    return Promise.resolve(ANSWERED)
  })
  expect(reached).toEqual(["100.64.0.2"])
  expect(asked[0]).toContain("http://127.0.0.1:8099/active")
  expect(asked[0]).toContain("answer kokoro")
  expect(asked[0]).toContain("http://127.0.0.1:18083/")
  expect(asked[0]).not.toContain("http://127.0.0.1:8083/")
})

test("a service answering is well, and a pool service swapped out is well while the cop answers", async () => {
  const health = await inferenceHealthFor(process.cwd(), () => Promise.resolve(ANSWERED))
  expect(brokenOf(health, "traffic-cop")).toBe(null)
  expect(brokenOf(health, "kokoro")).toBe(null)
  expect(brokenOf(health, "ollama")).toBe(null)
  expect(health.find((one) => one.slug === "kokoro")?.pagePath).toEndWith(
    "kokoro.service-inference.ts"
  )
})

test("a pool service resident and not answering on its own port is broken", async () => {
  const said = ANSWERED.replace("answer kokoro 200", "answer kokoro 000")
  const health = await inferenceHealthFor(process.cwd(), () => Promise.resolve(said))
  expect(brokenOf(health, "kokoro")).toBe(
    "kokoro is resident and does not answer on port 18083 of macbook"
  )
})

test("a cop that does not answer leaves itself and every pool service on its host broken", async () => {
  const said = "active \nanswer traffic-cop 000\nanswer kokoro 000\n"
  const health = await inferenceHealthFor(process.cwd(), () => Promise.resolve(said))
  expect(brokenOf(health, "traffic-cop")).toBe(
    "traffic-cop does not answer on port 8099 of macbook"
  )
  expect(brokenOf(health, "ollama")).toBe(
    "the traffic cop on macbook does not answer, so nothing brings ollama up"
  )
})

test("a host that cannot be reached leaves every service on it broken", async () => {
  const health = await inferenceHealthFor(process.cwd(), () =>
    Promise.reject(new Error("ssh exited 255 (host: walton@100.64.0.2)"))
  )
  expect(health.length).toBeGreaterThan(0)
  expect(
    health.every(
      (one) =>
        one.broken === "macbook could not be reached: ssh exited 255 (host: walton@100.64.0.2)"
    )
  ).toBe(true)
})
