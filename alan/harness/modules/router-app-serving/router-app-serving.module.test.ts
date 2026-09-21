import { expect, test } from "bun:test"
import {
  headed,
  type RouterAppServing,
  readerNamed,
  servedBy,
} from "akasha/alan/harness/modules/router-app-serving/router-app-serving.module.code.ts"
import { gateInScope } from "akasha/page/access/modules/read-gate/read-gate.module.code.ts"

const AT = new Request("https://requests.alanwalton.com/api/nav-icon/0d4d87c8")

const NOWHERE = "/var/tmp/no-client-folder-is-here"

function serving(routes: RouterAppServing["routes"]): RouterAppServing {
  return {
    clientDir: NOWHERE,
    csp: {},
    whoIsReading: async () => ({ user: null }),
    routes,
  }
}

test("every route of an app is reached inside a reader", async () => {
  let named = false
  await servedBy(
    serving(async () => {
      named = gateInScope() !== null
      return new Response("")
    }),
    AT,
    "/api/nav-icon/0d4d87c8"
  )
  expect(named).toBe(true)
})

test("a site naming its reader reads every request as that person", async () => {
  expect((await readerNamed("one")(AT)).user).toEqual({ person: "one" })
})

test("an answer that is not HTML is given back as the route wrote it", () => {
  const answered = new Response("{}", { headers: { "content-type": "application/json" } })
  expect(headed(answered, {}, "one")).toBe(answered)
})

test("an answer that is HTML carries the policy and the caching", () => {
  const answered = new Response("<p></p>", { headers: { "content-type": "text/html" } })
  const given = headed(answered, {}, "one")
  expect(given.headers.get("content-security-policy")).toContain("one")
  expect(given.headers.get("cache-control")).not.toBeNull()
})
