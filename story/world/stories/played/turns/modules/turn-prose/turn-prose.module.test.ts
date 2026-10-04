import { expect, test } from "bun:test"
import { PROSE } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.test-fixtures.ts"
import { proseTaken } from "akasha/story/world/stories/played/turns/modules/turn-prose/turn-prose.module.code.ts"

const ADMITTED = { types: ["character-player", "character-other"], filed: () => true }

const CAST = [{ address: "character-other/ceri", title: "Ceri", aliasOf: null }]

test("a writer's prose is kept ending on a newline, with its length and its characters", () => {
  const said = proseTaken(PROSE.prose, PROSE.characters, [], ADMITTED)
  expect(said).toEqual({
    prose: "Mara opens the gate.\n",
    values: { prose: "txt", ownLength: 4, characters: [...PROSE.characters] },
  })
})

test("a writer naming no one present in prose naming the cast is refused", () => {
  const said = proseTaken("Mara meets Ceri.", [], CAST, ADMITTED)
  expect("refused" in said ? said.refused : "").toContain("character-other/ceri")
})

test("empty prose is refused, naming whose advance it was", () => {
  const said = proseTaken(" \n", [], [], ADMITTED)
  expect("refused" in said ? said.refused : "").toContain("a writer's advance")
})
