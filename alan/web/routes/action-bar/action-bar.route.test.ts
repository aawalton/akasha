import { expect, test } from "bun:test"
import {
  type ActionBarEffects,
  answerActionBar,
  answerPendingActions,
  gameSeatHeld,
  pendingFor,
  type Stated,
} from "akasha/alan/web/.server/action-bar-answering/action-bar-answering.module.code.ts"
import {
  ACTION_BAR_PLAYER,
  ACTION_BAR_SENDER,
} from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import { TURN_SENDER } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"

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

const MASTER = "mari-game-master-the-game"

const BUILDER = "mari-world-builder-the-game"

const WRITER = "mari-writer-the-game"

const MADE_AT = "stories/the-game/turns/the-game-00-003.story-turn-played.ts"

function effectsWith(over: Partial<ActionBarEffects> = {}) {
  const written: Stated[] = []
  const made: string[] = []
  const effects: ActionBarEffects = {
    signedIn: async () => ({ contributor: "contributor-alan", subjectHash: "alan" }),
    enrol: async () => ({ ok: true, personSlug: "alan" }),
    seatOf: async () => ({ kind: "seated", seat: SEAT, game: GAME, person: "alan" }),
    write: async (stated) => {
      written.push(stated)
      return { kind: "written", id: "agent-message-one", relPath: "at" }
    },
    make: async (game, action) => {
      made.push(`${game}: ${action}`)
      return { kind: "made", slug: "the-game-00-003", at: MADE_AT }
    },
    pendingRows: async () => [],
    ...over,
  }
  return { effects, written, made }
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

test("a game naming no seat is answered as no game master", async () => {
  const { effects } = effectsWith({ seatOf: async () => ({ kind: "no-seat" }) })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(409)
})

test("a game master whose seat is not running is the action bar player's, to be started", () => {
  expect(gameSeatHeld(SEAT, GAME, undefined)).toEqual({
    kind: "seated",
    seat: SEAT,
    game: GAME,
    person: ACTION_BAR_PLAYER,
  })
  expect(gameSeatHeld(SEAT, GAME, { slug: SEAT, person: "person/someone-else" })).toEqual({
    kind: "seated",
    seat: SEAT,
    game: GAME,
    person: "someone-else",
  })
})

test("an action makes the game's next turn and tells every game seat, starting any", async () => {
  const { effects, written, made } = effectsWith({
    seatOf: async () => gameSeatHeld(MASTER, GAME, undefined),
  })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({ ok: true, id: "the-game-00-003" })
  expect(made).toEqual([`${GAME}: I wait`])
  const notice = `The turn \`${MADE_AT}\` is at world-builder.`
  expect(written).toEqual([
    { to: MASTER, from: TURN_SENDER, warrant: "announce", body: notice, startedOnDemand: true },
    { to: BUILDER, from: TURN_SENDER, warrant: "announce", body: notice, startedOnDemand: true },
    { to: WRITER, from: TURN_SENDER, warrant: "announce", body: notice, startedOnDemand: true },
  ])
})

test("a turn made is answered as made while the seats are still being told of it", async () => {
  const { effects, made } = effectsWith({ write: () => new Promise<never>(() => {}) })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({ ok: true, id: "the-game-00-003" })
  expect(made).toEqual([`${GAME}: I wait`])
})

test("a turn made is answered as made where telling a seat of it throws", async () => {
  const { effects } = effectsWith({
    write: async () => {
      throw new Error("the forwarder went away")
    },
  })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({ ok: true, id: "the-game-00-003" })
})

test("an action while the latest turn is being made is refused with what is making it", async () => {
  const said = "The last turn is still being made: the world builder is working on it."
  const { effects, written } = effectsWith({ make: async () => ({ kind: "refused", said }) })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(409)
  expect(await answered.json()).toEqual({ ok: false, error: said })
  expect(written).toEqual([])
})

test("a turn the pages would not make is answered as the game not listening", async () => {
  const { effects } = effectsWith({ make: async () => ({ kind: "unread", why: "no answer" }) })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "I wait" }), effects)
  expect(answered.status).toBe(503)
})

test("feedback is written to the game's seat from the action bar as typed", async () => {
  const { effects, written, made } = effectsWith()
  const answered = await answerActionBar(
    asked({ gameExternalId: GAME, text: "[slow down a little]" }),
    effects
  )
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({ ok: true, id: "agent-message-one" })
  expect(made).toEqual([])
  expect(written).toEqual([
    {
      to: SEAT,
      from: ACTION_BAR_SENDER,
      warrant: "announce",
      body: "[slow down a little]",
      startedOnDemand: true,
    },
  ])
})

test("feedback the pages refuse is answered as the game not listening", async () => {
  const { effects } = effectsWith({
    write: async () => ({ kind: "refused", detail: "no seat holds the name" }),
  })
  const answered = await answerActionBar(asked({ gameExternalId: GAME, text: "[wait]" }), effects)
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
