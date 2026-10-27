import type { Added } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { testStoryPlayerSwordplay } from "akasha/story/world/pages/test-world/stories/played/test-story/mechanics/skills-held/test-story-player-swordplay.character-skill.ts"
import { z } from "zod"

const RUNG = 10

const GOOD_DAY = 15

const HURT = "hurt in the drill"

const DRILL = z.object({
  character: z.string().trim().min(1),
  experience: z.number().int().min(0),
})

const DRILLED = z.object({
  gained: z.number().int().min(0),
  hurt: z.boolean(),
  experience: z.number().int().min(0),
  rung: z.number().int().min(0),
})

type Drilled = z.infer<typeof DRILLED>

type Settled = { readonly answered: Drilled } | { readonly refused: string }

type Next = {
  readonly reading: unknown
  readonly crossed: readonly string[]
  readonly left: string | null
}

export function settled(reading: unknown, roll: Rolled): Settled {
  const held = DRILL.safeParse(reading)
  if (!held.success) return { refused: `training reads so: ${z.prettifyError(held.error)}` }
  const hurt = roll.fumble
  const gained = hurt ? 0 : roll.total >= GOOD_DAY ? 2 : 1
  const experience = held.data.experience + gained
  return { answered: { gained, hurt, experience, rung: Math.floor(experience / RUNG) } }
}

export function added(_reading: unknown, answered: unknown): readonly Added[] {
  const drilled = DRILLED.safeParse(answered)
  if (!drilled.success || drilled.data.gained === 0) return []
  const page = `${characterSkill.slug}/${testStoryPlayerSwordplay.slug}`
  return [{ page, key: "experience", by: drilled.data.gained }]
}

export function next(reading: unknown, answered: unknown): Next {
  const held = DRILL.parse(reading)
  const drilled = DRILLED.parse(answered)
  const crossed =
    drilled.rung > Math.floor(held.experience / RUNG) ? [`swordplay rung ${drilled.rung}`] : []
  return {
    reading: { ...held, experience: drilled.experience },
    crossed,
    left: drilled.hurt ? HURT : null,
  }
}
