import { expect, test } from "bun:test"
import { carriedToStore } from "akasha/page/query/modules/store-carrying/store-carrying.module.code.ts"

function asked(body: string): Request {
  return new Request("https://example.test/api/shape", { method: "POST", body })
}

const signedIn = async () => true

const signedOut = async () => false

test("a reader who is not signed in is refused before the store is reached", async () => {
  let reached = false
  const answered = await carriedToStore(asked("{}"), "/shape", "a shape", signedOut, async () => {
    reached = true
    return { ok: true, body: {} }
  })
  expect(answered.status).toBe(401)
  expect(reached).toBe(false)
})

test("a body that is not JSON is refused", async () => {
  const answered = await carriedToStore(asked("not json"), "/shape", "a shape", signedIn)
  expect(answered.status).toBe(400)
})

test("the body is carried to the path named and the store's answer comes back unchanged", async () => {
  const carried: unknown[] = []
  const answered = await carriedToStore(
    asked('{"pageTypeSlug":"temper-skill"}'),
    "/shape",
    "a shape",
    signedIn,
    async (path, _what, body) => {
      carried.push({ path, body })
      return { ok: true, body: { shape: null } }
    }
  )
  expect(carried).toEqual([{ path: "/shape", body: { pageTypeSlug: "temper-skill" } }])
  expect(await answered.json()).toEqual({ shape: null })
})

test("a store refusal comes back with the store's status and reason", async () => {
  const answered = await carriedToStore(asked("{}"), "/shape", "a shape", signedIn, async () => ({
    ok: false,
    why: "no such page type",
    status: 400,
  }))
  expect(answered.status).toBe(400)
  expect(await answered.json()).toEqual({ refused: "no such page type" })
})
