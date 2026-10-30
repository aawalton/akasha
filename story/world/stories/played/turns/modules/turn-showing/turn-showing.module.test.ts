import { expect, test } from "bun:test"
import { beatsOf } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.test-fixtures.ts"

import { heldAt } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"
import {
  changesShown,
  changesUnshown,
} from "akasha/story/world/stories/played/turns/modules/turn-showing/turn-showing.module.code.ts"

const ENTRY = { page: "metric/xp", key: "value", from: 1, to: 2, note: "+1" }

const LATER = { ...ENTRY, from: 2, to: 3 }

const GAIN = { beat: 1, ...ENTRY }

test("only the changes of beats a move shows reach their pages, once", () => {
  const one = { beat: 1, event: "One.", changes: [ENTRY], prose: "One told." }
  const before = beatsOf(one, { beat: 2, event: "Two.", changes: [LATER] })
  const after = beatsOf(one, { beat: 2, event: "Two.", changes: [LATER], prose: "Two told." })
  const later = { beat: 2, ...LATER }
  const held = heldAt("beats", { flow: before, beats: 2 })
  expect(changesShown(held, "beats", after)).toEqual([later])
  expect(changesShown(held, "player", null)).toEqual([])
  expect(changesUnshown(held)).toEqual([later])
  expect(changesShown(heldAt("recorders", { changes: [GAIN] }), "player", null)).toEqual([GAIN])
})

test("a move from player to player, as a one-seat turn's memory is, shows no change again", () => {
  const shown = beatsOf({ beat: 1, event: "One.", changes: [ENTRY], prose: "One told." })
  const held = heldAt("player", { changes: [GAIN], flow: shown, beats: 1 })
  expect(changesShown(held, "player", shown)).toEqual([])
  expect(changesShown(held, "player", null)).toEqual([])
})
