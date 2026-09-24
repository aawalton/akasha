import { expect, test } from "bun:test"
import {
  ACTION_BAR_AT,
  type Fetching,
  readPending,
  sendAction,
} from "akasha/story/world/stories/played/modules/action-bar-sending/action-bar-sending.module.code.ts"

type Asked = { readonly input: string; readonly init: RequestInit | undefined }

function answering(status: number, body: unknown) {
  const asked: Asked[] = []
  const fetching: Fetching = async (input, init) => {
    asked.push({ input, init })
    return new Response(JSON.stringify(body), { status })
  }
  return { asked, fetching }
}

const ACTION = { gameExternalId: "the-game", text: "[slow down]" }

test("an action is posted to the action bar route as typed", async () => {
  const { asked, fetching } = answering(200, { ok: true, id: "agent-message-1" })
  expect(await sendAction(ACTION, fetching)).toEqual({ ok: true, id: "agent-message-1" })
  expect(asked[0]?.input).toBe(ACTION_BAR_AT)
  expect(asked[0]?.init?.method).toBe("POST")
  expect(JSON.parse(String(asked[0]?.init?.body))).toEqual(ACTION)
})

test("an answer saying the caller is not signed in reads as signed out", async () => {
  const { fetching } = answering(401, { ok: false, error: "Not authenticated." })
  const sent = await sendAction(ACTION, fetching)
  expect(sent.ok === false && sent.signedOut === true).toBe(true)
})

test("a refusal carries the error the route answered", async () => {
  const { fetching } = answering(503, { ok: false, error: "The game is not listening." })
  expect(await sendAction(ACTION, fetching)).toEqual({
    ok: false,
    error: "The game is not listening.",
  })
})

test("an answer nothing can be read out of says the game did not respond", async () => {
  const fetching: Fetching = async () => new Response("<html>", { status: 502 })
  expect(await sendAction(ACTION, fetching)).toEqual({
    ok: false,
    error: "The game did not respond. Try again.",
  })
})

test("a send that throws says the game did not respond", async () => {
  const fetching: Fetching = async () => {
    throw new Error("offline")
  }
  expect(await sendAction(ACTION, fetching)).toEqual({
    ok: false,
    error: "The game did not respond. Try again.",
  })
})

test("the actions waiting are read for the game named", async () => {
  const { asked, fetching } = answering(200, {
    ok: true,
    pending: [
      { id: "agent-message-1", text: "[note]", kind: "feedback" },
      { id: "agent-message-2", text: "odd", kind: "shout" },
    ],
  })
  expect(await readPending("the game", fetching)).toEqual([
    { id: "agent-message-1", text: "[note]", kind: "feedback" },
  ])
  expect(asked[0]?.input).toBe(`${ACTION_BAR_AT}?game=the%20game`)
})

test("a refused read of the actions waiting reads as nothing known", async () => {
  const { fetching } = answering(403, { ok: false, error: "no" })
  expect(await readPending("the-game", fetching)).toBeNull()
})
