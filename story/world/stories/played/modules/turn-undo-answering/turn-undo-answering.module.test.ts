import { expect, test } from "bun:test"
import { DATA } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type UndoAnswering,
  undoAnswered,
  undoArgv,
  undoAskedIn,
  undoOf,
} from "akasha/story/world/stories/played/modules/turn-undo-answering/turn-undo-answering.module.code.ts"

const STORY = "stories/the-saga/the-saga.story-played.ts"

const TURN = "story-turn-played/the-saga-00-012"

const DONE: Answer = { report: ["done"], refusals: [], code: 0 }

type Seen = { readonly ran: string[]; readonly answered: (string | null)[] }

function effectsOver(
  step: string | null,
  answer: Answer,
  goes: boolean,
  into: Seen
): UndoAnswering {
  let there = step !== null
  const ran = (name: string) => async (argv: readonly string[]) => {
    into.ran.push(`${name} ${argv.join(" ")}`)
    if (goes) there = false
    return answer
  }
  return {
    beside: () => ({ turnUndo: TURN }) as Value,
    turn: () => (there ? ({ stepStatus: `step-status/${step}` } as Value) : null),
    cancel: ran("cancel"),
    takeBack: ran("take-back"),
    answer: (_story, refused) => {
      into.answered.push(refused)
      return undefined
    },
  }
}

function seen(): Seen {
  return { ran: [], answered: [] }
}

test("an ask names a played turn, and nothing else is an ask", () => {
  expect(undoAskedIn({ turnUndo: TURN } as Value)).toBe(TURN)
  expect(undoAskedIn({ turnUndo: "image/x" } as Value)).toBeNull()
  expect(undoAskedIn(null)).toBeNull()
})

test("a turn before player is cancelled with its mechanics taken back", async () => {
  const into = seen()
  expect(await undoOf(STORY, effectsOver("reviewers", DONE, true, into))).toBe(true)
  expect(into.ran).toEqual([`cancel --turn ${TURN} --take-back-mechanics`])
  expect(into.answered).toEqual([null])
})

test("a turn at player is taken back", async () => {
  const into = seen()
  await undoOf(STORY, effectsOver("player", DONE, true, into))
  expect(into.ran).toEqual([`take-back --turn ${TURN}`])
  expect(into.answered).toEqual([null])
})

test("a turn still there once the command answers leaves the command's refusal on the story", async () => {
  const into = seen()
  const refused: Answer = { report: [], refusals: ["it is published already"], code: DATA }
  await undoOf(STORY, effectsOver("writer", refused, false, into))
  expect(into.answered).toEqual(["it is published already"])
})

test("a turn gone already runs nothing and says so", async () => {
  const into = seen()
  await undoOf(STORY, effectsOver(null, DONE, true, into))
  expect(into.ran).toEqual([])
  expect(into.answered).toEqual(["That turn is no longer here to undo."])
})

test("an answer takes the ask off and leaves only this refusal", () => {
  const held = { turnUndo: TURN, turnUndoRefused: "old", actionDraft: "I go" } as Value
  expect(undoAnswered(held, null)).toEqual({ actionDraft: "I go" })
  expect(undoAnswered(held, "no")).toEqual({ actionDraft: "I go", turnUndoRefused: "no" })
})

test("the argv a cancel and a take-back are handed", () => {
  expect(undoArgv(TURN, false)).toEqual(["--turn", TURN, "--take-back-mechanics"])
  expect(undoArgv(TURN, true)).toEqual(["--turn", TURN])
})
