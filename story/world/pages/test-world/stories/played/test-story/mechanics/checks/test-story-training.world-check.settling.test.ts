import { expect, test } from "bun:test"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { testStoryPlayer } from "akasha/story/world/pages/test-world/stories/played/test-story/characters/test-story-player.character-player.ts"
import {
  added,
  next,
  settled,
} from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/checks/test-story-training.world-check.settling.code.ts"
import { testStoryPlayerSwordplay } from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/skills-held/test-story-player-swordplay.character-skill.ts"

const READING = { character: `${characterPlayer.slug}/${testStoryPlayer.slug}`, experience: 38 }

const ROLL = { total: 16, crit: false, fumble: false }

test("a good day earns two experience and crosses the next rung", () => {
  const said = settled(READING, ROLL)
  expect(said).toEqual({ answered: { gained: 2, hurt: false, experience: 40, rung: 4 } })
  if (!("answered" in said)) return
  expect(next(READING, said.answered)).toEqual({
    reading: { ...READING, experience: 40 },
    crossed: ["swordplay rung 4"],
    left: null,
  })
  const page = `${characterSkill.slug}/${testStoryPlayerSwordplay.slug}`
  expect(added(READING, said.answered)).toEqual([{ page, key: "experience", by: 2 }])
})

test("a natural one hurts, earns nothing and leaves the routine", () => {
  const said = settled(READING, { total: 1, crit: false, fumble: true })
  if (!("answered" in said)) throw new Error("refused")
  expect(added(READING, said.answered)).toEqual([])
  expect(next(READING, said.answered).left).toBe("hurt in the drill")
})

test("a reading with no experience is refused", () => {
  expect(settled({ character: READING.character }, ROLL)).toHaveProperty("refused")
})
