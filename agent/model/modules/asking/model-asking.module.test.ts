import { afterAll, expect, test } from "bun:test"
import { exitFor, modelAsking } from "akasha/agent/model/modules/asking/model-asking.module.code.ts"

const REFUSED = "refused"

const EMPTY = "empty"

const TOKEN = "token"

const MODEL = "model"

const gateway = Bun.serve({
  port: 0,
  async fetch(request) {
    const held = (await request.json()) as { messages?: readonly { content?: unknown }[] }
    const prompt = held.messages?.[0]?.content
    if (prompt === REFUSED) return new Response("refused", { status: 400 })
    if (prompt === EMPTY) return Response.json({ content: [] })
    return Response.json({ content: [{ type: "text", text: `said ${String(prompt)}` }] })
  },
})

afterAll(() => {
  gateway.stop(true)
})

const AT = `${gateway.url.origin}/v1/messages`

test("a prompt that reached no model answers null in its own slot, and the others are kept", async () => {
  const held = await modelAsking({ model: MODEL, prompts: ["one", REFUSED, "three"] }, AT, TOKEN)
  expect(held.answers).toEqual(["said one", null, "said three"])
})

test("an answer holding no text is a prompt that reached no model", async () => {
  const held = await modelAsking({ model: MODEL, prompts: [EMPTY, "two"] }, AT, TOKEN)
  expect(held.answers).toEqual([null, "said two"])
})

test("each answer keeps its prompt's place past the prompts in flight at once", async () => {
  const prompts = ["a", "b", "c", "d", REFUSED, "f"]
  const held = await modelAsking({ model: MODEL, prompts }, AT, TOKEN)
  expect(held.answers).toEqual(["said a", "said b", "said c", "said d", null, "said f"])
})

test("why each prompt reached no model is said once for that prompt", async () => {
  const held = await modelAsking({ model: MODEL, prompts: [REFUSED, "two", REFUSED] }, AT, TOKEN)
  expect(held.whys).toHaveLength(2)
  expect(held.whys[0]).toContain("400")
})

test("a job every prompt answered says nothing of failing", async () => {
  const held = await modelAsking({ model: MODEL, prompts: ["one"] }, AT, TOKEN)
  expect(held.whys).toEqual([])
})

test("a job exits non-zero only where no prompt reached a model", () => {
  expect(exitFor([null, null])).toBe(3)
  expect(exitFor([null, "YES"])).toBe(0)
  expect(exitFor(["NO"])).toBe(0)
  expect(exitFor([])).toBe(0)
})
