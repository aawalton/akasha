import { expect, test } from "bun:test"
import {
  GAME_MASTER,
  WORLD_BUILDER,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import {
  fromRoleplay,
  roleplayTakes,
} from "akasha/story/world/stories/played/turns/modules/turn-roleplaying/turn-roleplaying.module.code.ts"

const ADMITTED = { types: [], filed: () => true }

test("a roleplayed turn takes prose at world-builder alone", () => {
  expect(roleplayTakes({ status: WORLD_BUILDER, roleplayed: true })).toBe("prose")
  expect(roleplayTakes({ status: WORLD_BUILDER })).toBe(null)
  expect(roleplayTakes({ status: WRITER, roleplayed: true })).toBe(null)
})

test("a roleplayed turn's prose moves it to game-master with its prose", () => {
  const said = fromRoleplay({ kind: "prose", prose: "She waits.", characters: [] }, [], ADMITTED)
  if ("refused" in said) throw new Error(said.refused)
  expect(said.status).toBe(GAME_MASTER)
  expect(said.prose).toBe("She waits.\n")
  expect(said.values.prose).toBe("txt")
})

test("a roleplayed turn handing in no prose is refused", () => {
  const said = fromRoleplay({ kind: "prose", prose: " ", characters: [] }, [], ADMITTED)
  expect("refused" in said).toBe(true)
})
