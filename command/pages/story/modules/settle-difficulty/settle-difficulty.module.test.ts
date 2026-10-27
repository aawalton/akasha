import { afterAll, expect, test } from "bun:test"
import { rmSync } from "node:fs"
import { rolledBy } from "akasha/command/pages/story/modules/settle-difficulty/settle-difficulty.module.code.ts"
import {
  type Appended,
  answeredBy,
  argvFor,
  LATEST,
  ROOT,
  reachOver,
  rollIn,
} from "akasha/command/pages/story/settle/story-settle.command.test-fixtures.ts"
import { difficultyLevel } from "akasha/story/world/stories/played/difficulty-levels/difficulty-level.page-type.ts"
import { hard } from "akasha/story/world/stories/played/difficulty-levels/pages/hard.difficulty-level.ts"

afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

const HARD = { level: `${difficultyLevel.slug}/${hard.slug}`, by: hard.oddsModifier }

test("a level moves the roll's total and leaves a natural twenty as rolled", () => {
  expect(rolledBy({ total: 20, crit: true, fumble: false }, HARD)).toEqual({
    total: 20 + HARD.by,
    crit: true,
    fumble: false,
  })
})

test("a check the level does not move is handed the roll as rolled", () => {
  const roll = { total: 9, crit: false, fumble: false }
  expect(rolledBy(roll, null)).toBe(roll)
})

test("a moved roll is handed to the check moved, and its line states the level", async () => {
  const reach = reachOver([LATEST], 0, "writer", [], { answered: HARD })
  const { answer, appended } = await answeredBy(argvFor("answering"), reach)
  const roll = rollIn(appended[0] as Appended)
  const faces = roll.dice?.faces ?? []
  expect((roll.answered as { readonly total: number }).total).toBe(
    (faces[0] ?? 0) + (faces[1] ?? 0) + HARD.by
  )
  expect(roll.difficultyLevel).toEqual(HARD)
  expect(answer.report).toContain(`difficultyLevel\t${HARD.level}\t${HARD.by}`)
})

test("a roll the level does not move states no level", async () => {
  const { appended } = await answeredBy(argvFor("answering"), reachOver([LATEST]))
  expect(rollIn(appended[0] as Appended)).not.toHaveProperty("difficultyLevel")
})

test("a story naming a level that is no page appends nothing", async () => {
  const reach = reachOver([LATEST], 0, "writer", [], { refused: "no such level" })
  const { answer, appended } = await answeredBy(argvFor("answering"), reach)
  expect(appended).toEqual([])
  expect(answer.refusals.join("\n")).toContain("no such level")
})
