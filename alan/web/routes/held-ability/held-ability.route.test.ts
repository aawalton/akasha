import { expect, test } from "bun:test"
import {
  answerHeldAbility,
  askIn,
  type HeldAbilityEffects,
} from "akasha/alan/web/.server/held-ability-answering/held-ability-answering.module.code.ts"
import type { Wanted } from "akasha/story/world/mechanics/modules/ability-slotting/ability-slotting.module.code.ts"
import type { HeldSet } from "akasha/story/world/stories/played/modules/held-ability-setting/held-ability-setting.module.code.ts"

const GAME = "the-game"

const HELD = "character-skill/the-game-nala-path-of-counting"

function asked(body: unknown): Request {
  return new Request("https://alanwalton.com/api/held-ability", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  })
}

function effectsWith(set: HeldSet, over: Partial<HeldAbilityEffects> = {}) {
  const sets: string[] = []
  const effects: HeldAbilityEffects = {
    signedIn: async () => ({ contributor: "contributor-alan", subjectHash: "alan" }),
    enrol: async () => ({ ok: true, personSlug: "alan" }),
    seatOf: async () => ({ kind: "seated", seat: "gm-seat", game: GAME, person: "alan" }),
    set: async (game: string, held: string, wanted: Wanted) => {
      sets.push(`${game} ${held} ${wanted}`)
      return set
    },
    ...over,
  }
  return { effects, sets }
}

const SET: HeldSet = { kind: "set", event: "Path of Counting is set aside at tier 1.", turn: "t-2" }

const ASK = { gameExternalId: GAME, held: HELD, wanted: "set-aside" }

test("a held ability set aside is answered with the event its beat states", async () => {
  const { effects, sets } = effectsWith(SET)
  const answered = await answerHeldAbility(asked(ASK), effects)
  expect(answered.status).toBe(200)
  expect(await answered.json()).toEqual({
    ok: true,
    event: "Path of Counting is set aside at tier 1.",
    turn: "t-2",
  })
  expect(sets).toEqual([`${GAME} ${HELD} set-aside`])
})

test("a change refused is answered with why", async () => {
  const said = "All 10 Paths slots are held, so set one aside first."
  const { effects } = effectsWith({ kind: "refused", said })
  const answered = await answerHeldAbility(asked(ASK), effects)
  expect(answered.status).toBe(409)
  expect(await answered.json()).toEqual({ ok: false, error: said })
})

test("a change the pages would not take is answered as the game not listening", async () => {
  const { effects } = effectsWith({ kind: "unread", why: "no answer" })
  expect((await answerHeldAbility(asked(ASK), effects)).status).toBe(503)
  const thrown = effectsWith(SET, {
    set: async () => {
      throw new Error("the forwarder went away")
    },
  })
  expect((await answerHeldAbility(asked(ASK), thrown.effects)).status).toBe(503)
})

test("a caller who is not signed in is refused and nothing is changed", async () => {
  const { effects, sets } = effectsWith(SET, { signedIn: async () => null })
  expect((await answerHeldAbility(asked(ASK), effects)).status).toBe(401)
  expect(sets).toEqual([])
})

test("a caller the game is not played for is refused and nothing is changed", async () => {
  const { effects, sets } = effectsWith(SET, {
    enrol: async () => ({ ok: true, personSlug: "someone-else" }),
  })
  expect((await answerHeldAbility(asked(ASK), effects)).status).toBe(403)
  expect(sets).toEqual([])
})

test("an ask naming no held ability or no change is refused", async () => {
  const { effects, sets } = effectsWith(SET)
  expect((await answerHeldAbility(asked({ ...ASK, wanted: "used" }), effects)).status).toBe(400)
  expect((await answerHeldAbility(asked({ ...ASK, held: " " }), effects)).status).toBe(400)
  expect(sets).toEqual([])
  expect(askIn({ ...ASK, wanted: "taken-up" })).toEqual({
    game: GAME,
    held: HELD,
    wanted: "taken-up",
  })
})
