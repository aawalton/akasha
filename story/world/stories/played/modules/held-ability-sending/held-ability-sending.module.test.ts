import { expect, test } from "bun:test"
import {
  type HeldAsk,
  sendHeldAbility,
} from "akasha/story/world/stories/played/modules/held-ability-sending/held-ability-sending.module.code.ts"

const ASK: HeldAsk = {
  gameExternalId: "the-game",
  held: "character-skill/the-game-nala-path-of-counting",
  wanted: "set-aside",
}

function answering(status: number, body: unknown) {
  const sent: { readonly input: string; readonly body: unknown }[] = []
  const fetching = async (input: string, init?: RequestInit) => {
    sent.push({ input, body: JSON.parse(String(init?.body ?? "null")) })
    return new Response(JSON.stringify(body), { status })
  }
  return { fetching, sent }
}

test("a change made is answered with its event and tells the sheet to read again", async () => {
  const { fetching, sent } = answering(200, {
    ok: true,
    event: "Counting is set aside.",
    turn: "t",
  })
  let told = 0
  const answer = await sendHeldAbility(ASK, fetching, () => {
    told += 1
    return undefined
  })
  expect(answer).toEqual({ ok: true, event: "Counting is set aside." })
  expect(told).toBe(1)
  expect(sent).toEqual([{ input: "/api/held-ability", body: ASK }])
})

test("a change refused is answered with why, and the sheet is not told", async () => {
  const { fetching } = answering(409, { ok: false, error: "All 10 Paths slots are held." })
  let told = 0
  const answer = await sendHeldAbility(ASK, fetching, () => {
    told += 1
    return undefined
  })
  expect(answer).toEqual({ ok: false, error: "All 10 Paths slots are held." })
  expect(told).toBe(0)
})

test("an answer nothing can be read out of says the game did not respond", async () => {
  const fetching = async () => new Response("not json", { status: 502 })
  const answer = await sendHeldAbility(ASK, fetching, () => undefined)
  expect(answer).toEqual({ ok: false, error: "The game did not respond. Try again." })
})

test("a caller who is not signed in is asked to sign in", async () => {
  const { fetching } = answering(401, { ok: false })
  const answer = await sendHeldAbility(ASK, fetching, () => undefined)
  expect(answer).toEqual({ ok: false, error: "Sign in to change your sheet." })
})
