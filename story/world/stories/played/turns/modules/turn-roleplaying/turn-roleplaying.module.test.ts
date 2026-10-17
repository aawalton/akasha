import { expect, test } from "bun:test"
import {
  type Advanced,
  GAME_MASTER,
  type Handed,
  type Held,
  MECHANICS,
  RECORDERS,
  WORLD_BUILDER,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  advanced,
  CAST,
  heldAt,
  movedOf,
  PROSE,
  refusalOf,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"
import { roleplayTakes } from "akasha/story/world/stories/played/turns/modules/turn-roleplaying/turn-roleplaying.module.code.ts"
import { roleOf } from "akasha/story/world/stories/played/turns/modules/turn-waiting/turn-waiting.module.code.ts"

const HELD = heldAt(WORLD_BUILDER, { roleplayed: true })

const TOLD = { kind: "beats", beats: ["Mara opens the gate."], told: PROSE } as const

function advancedOn(held: Held, handed: Handed, mechanics: readonly string[]): Advanced {
  const caller = { role: roleOf(held), game: held.game }
  return advanced(held, caller, handed, [], undefined, [], undefined, mechanics)
}

test("a roleplayed turn takes beats, with their prose, at world-builder alone", () => {
  expect(roleplayTakes({ status: WORLD_BUILDER, roleplayed: true })).toBe("beats")
  expect(roleplayTakes({ status: WORLD_BUILDER })).toBe(null)
  expect(roleplayTakes({ status: WRITER, roleplayed: true })).toBe(null)
})

test("a roleplayed turn's beats and prose move it to mechanics, landing both", () => {
  const said = movedOf(advancedOn(HELD, TOLD, [CAST]))
  expect(said.status).toBe(MECHANICS)
  expect(said.prose).toBe("Mara opens the gate.\n")
  expect(said.planned?.beats).toEqual(["Mara opens the gate."])
  expect(said.values.prose).toBe("txt")
  expect(said.values.beats).toBe("jsonl")
  expect(said.starts).toEqual([{ kind: "mechanics", recorder: CAST }])
})

test("a roleplayed turn whose story has no mechanics seat goes on to recorders", () => {
  const said = movedOf(advancedOn(HELD, TOLD, []))
  expect(said.status).toBe(RECORDERS)
  expect(said.values.characters).toEqual(PROSE.characters)
})

test("a roleplayed turn at world-builder refuses prose without beats and beats without prose", () => {
  expect(refusalOf(advancedOn(HELD, PROSE, []))).toContain("prose without beats")
  const untold = { kind: "beats", beats: ["Mara opens the gate."] } as const
  expect(refusalOf(advancedOn(HELD, untold, []))).toContain("beats without prose")
})

test("prose with beats is refused on a turn not roleplayed", () => {
  const held = { ...HELD, status: GAME_MASTER, roleplayed: false }
  expect(refusalOf(advancedOn(held, TOLD, []))).toContain("not roleplayed")
})

test("a roleplayed turn handing in no prose with its beats is refused", () => {
  const told: Handed = { ...TOLD, told: { ...PROSE, prose: " " } }
  expect(refusalOf(advancedOn(HELD, told, []))).toContain("hands in prose, and this has none")
})

test("a roleplayed turn at game-master with its prose written takes beats alone and skips the writer", () => {
  const held = { ...HELD, status: GAME_MASTER, written: true }
  const beats = { kind: "beats", beats: ["Mara opens the gate."] } as const
  expect(movedOf(advancedOn(held, beats, [])).status).toBe(RECORDERS)
})
