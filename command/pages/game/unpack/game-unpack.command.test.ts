import { expect, test } from "bun:test"
import {
  messageFor,
  rowsIn,
  taken,
} from "akasha/command/pages/game/unpack/game-unpack.command.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.story-game.ts"
import { storyGame } from "akasha/story/game/story-game.page-type.ts"

const CALLED = "akasha game unpack"

const SAID = namedAs(storyGame.slug, theTower.slug, null)

test("a blank line between rows is no row", () => {
  expect(rowsIn('{"a":1}\n\n{"a":2}\n')).toEqual(['{"a":1}', '{"a":2}'])
})

test("the commit says which rows of which game were made into pages", () => {
  expect(messageFor(gameMechanicRun.pluralSlug, theTower.slug)).toBe(
    `make a page of each ${gameMechanicRun.pluralSlug} row of ${theTower.slug}`
  )
})

test("a call names the game and the rows beside it", () => {
  const read = taken(["--game", SAID, "--ledger", gameMechanicRun.pluralSlug], CALLED)
  expect(read).toEqual({ game: SAID, ledger: gameMechanicRun.pluralSlug })
})

test("rows this command does not know are refused", () => {
  const read = taken(["--game", SAID, "--ledger", "states"], CALLED)
  expect("refused" in read).toBe(true)
})

test("a call naming no game is refused", () => {
  const read = taken(["--game", " ", "--ledger", gameMechanicRun.pluralSlug], CALLED)
  expect("refused" in read).toBe(true)
})
