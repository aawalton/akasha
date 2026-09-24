import { expect, test } from "bun:test"
import {
  type ActionBarEffects,
  answerActionBar,
  answerPendingActions,
  pendingFor,
  type Stated,
} from "akasha/alan/web/.server/action-bar-answering/action-bar-answering.module.code.ts"
import { ACTION_BAR_SENDER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"

const SEAT = "gm-seat"

const GAME = "the-game"

const WAITING_URL = `https://alanwalton.com/api/action-bar?game=${GAME}`

function asked(body: unknown, method = "POST", url = "https://alanwalton.com/api/action-bar") {
  if (method === "GET") return new Request(url, { method })
  return new Request(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
}

function effectsWith(over: Partial<ActionBarEffects> = {}) {
  const written: Stated[] = []
  const effects: ActionBarEffects = {
    signedIn: async () => ({ contributor: "contributor-alan", subjectHash: "alan" }),
    enrol: async () => ({ ok: true, personSlug: "alan" }),
    seatOf: async () => ({ kind: "seated", seat: SEAT, person: "alan" }),
    write: async (stated) => {
      written.push(stated)
      return { kind: "written", id: "agent-message-one", relPath: "at" }
    },
    pendingRows: async () => [],
    ...over,
  }
  return { effects, written }
}

test("a caller who is not signed in is refused and nothing is written", async () => {
  const { effects, written } = effectsWith({ signedIn: async () => null })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(401)
  expect(written).toEqual([])
})

test("a caller signed in as someone the seat does not answer to is refused", async () => {
  const { effects, written } = effectsWith({
    enrol: async () => ({ ok: true, personSlug: "someone-else" }),
  })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(403)
  expect(written).toEqual([])
})

test("a body with no action is refused", async () => {
  const { effects } = effectsWith()
  expect((await answerActionBar(asked({ gameExternalId: GAME, text: "  " }), effects)).status).toBe(
    400
  )
  expect((await answerActionBar(asked({ text: "I wait" }), effects)).status).toBe(400)
})

test("a game nobody has is answered as no game", async () => {
  const { effects } = effectsWith({ seatOf: async () => ({ kind: "no-game" }) })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(404)
})

test("a game naming no seat anybody holds is answered as no game master", async () => {
  const { effects } = effectsWith({ seatOf: async () => ({ kind: "no-seat" }) })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(409)
})

test("an action is written to the game's seat from the action bar as typed", async () => {
  const { effects, written } = effectsWith()
  const answered = await answerActionBar(
    asked({ gameExternalId: GAME, text: "[slow down a little]" }),
    effects
  )
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({ ok: true, id: "agent-message-one" })
  expect(written).toEqual([
    { to: SEAT, from: ACTION_BAR_SENDER, warrant: "announce", body: "[slow down a little]" },
  ])
})

test("a write the pages refuse is answered as the game not listening", async () => {
  const { effects } = effectsWith({
    write: async () => ({ kind: "refused", detail: "no seat holds the name" }),
  })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(503)
})

test("the actions waiting are answered to the player", async () => {
  const { effects } = effectsWith({
    pendingRows: async () => [
      { slug: "agent-message-2", to: `seat/${SEAT}`, from: ACTION_BAR_SENDER, body: "[note]\n" },
    ],
  })
  const answered = await answerPendingActions(asked(null, "GET", WAITING_URL), effects)
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({
    ok: true,
    pending: [{ id: "agent-message-2", text: "[note]", kind: "feedback" }],
  })
})

test("the actions waiting are refused to a caller who is not signed in", async () => {
  const { effects } = effectsWith({ signedIn: async () => null })
  const answered = await answerPendingActions(asked(null, "GET", WAITING_URL), effects)
  expect(answered.status).toBe(401)
})

test("an action waiting is one from the action bar to that seat nobody has taken", () => {
  const rows = [
    { slug: "agent-message-3", to: `seat/${SEAT}`, from: ACTION_BAR_SENDER, body: "I run\n" },
    { slug: "agent-message-1", to: SEAT, from: ACTION_BAR_SENDER, body: "I look\n" },
    {
      slug: "agent-message-2",
      to: SEAT,
      from: ACTION_BAR_SENDER,
      body: "I hide\n",
      claimedAt: "2026-09-24T12:00:00.000Z",
    },
    { slug: "agent-message-4", to: "another-seat", from: ACTION_BAR_SENDER, body: "I sing\n" },
    { slug: "agent-message-5", to: SEAT, from: "telnyx-sms", body: "a text\n" },
  ]
  expect(pendingFor(rows, SEAT)).toEqual([
    { id: "agent-message-1", text: "I look", kind: "action" },
    { id: "agent-message-3", text: "I run", kind: "action" },
  ])
})
