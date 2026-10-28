import type { Added } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import { tiersPassed } from "akasha/story/world/mechanics/modules/ability-slotting/ability-slotting.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { giftedUnallocatedStats } from "akasha/story/world/pages/gifted/mechanics/metrics/resources/unallocated-stats/gifted-unallocated-stats.page-type.ts"
import { giftedPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-basic-numeracy.world-skill.ts"
import { giftedPathOfEavesdropping } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-eavesdropping.world-skill.ts"
import { giftedPathOfEndurance } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-endurance.world-skill.ts"
import { giftedPathOfLinguisticsEnglish } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-linguistics-english.world-skill.ts"
import { giftedPathOfWillpower } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-willpower.world-skill.ts"
import { giftedRebornNala as nalaUnallocatedStats } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/metrics/points/gifted-reborn-nala.gifted-unallocated-stats.ts"
import { giftedRebornNalaPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-basic-numeracy.character-skill.ts"
import { giftedRebornNalaPathOfEavesdropping } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-eavesdropping.character-skill.ts"
import { giftedRebornNalaPathOfEndurance } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-endurance.character-skill.ts"
import { giftedRebornNalaPathOfLinguisticsEnglish } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-linguistics-english.character-skill.ts"
import { giftedRebornNalaPathOfWillpower } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-willpower.character-skill.ts"
import { z } from "zod"

export const BASIC_TIERS = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

const KNOWN_STEPS = 3

const TIER_POINT = 1

const STAT_TIER = 9

const STAT_TIER_STATS = 1

const LAST_TIER = 10

const LAST_TIER_STATS = 2

const TALENTED_SHARE = 500

const GIFTED_SHARE = 250

export const SPEED = {
  talented: z.number().int().min(0).optional(),
  gifted: z.number().int().min(0).optional(),
}

export type Speed = { readonly talented?: number | undefined; readonly gifted?: number | undefined }

export const ONE_SPEED = "say `talented` or `gifted`, never both"

export function oneSpeed(speed: Speed): boolean {
  return speed.talented === undefined || speed.gifted === undefined
}

export function sped(steps: number, speed: Speed, whole: (exact: number) => number): number {
  if (speed.talented !== undefined) {
    return whole((steps * (TALENTED_SHARE + speed.talented)) / TALENTED_SHARE)
  }
  if (speed.gifted !== undefined) {
    return whole((steps * (GIFTED_SHARE + speed.gifted)) / GIFTED_SHARE)
  }
  return steps
}

export function unallocated(by: number): Added {
  return {
    page: addressOf(giftedUnallocatedStats.slug, nalaUnallocatedStats.slug),
    key: "value",
    by,
  }
}

export function basicPaid(attribute: string, from: number, to: number): readonly Added[] {
  let points = 0
  let stats = 0
  for (let tier = from + 1; tier <= to; tier++) {
    if (tier === LAST_TIER) stats += LAST_TIER_STATS
    else if (tier === STAT_TIER) stats += STAT_TIER_STATS
    else points += TIER_POINT
  }
  const paid: Added[] = []
  if (points > 0) paid.push({ page: attribute, key: "value", by: points })
  if (stats > 0) paid.push(unallocated(stats))
  return paid
}

const PATHS = [
  { held: giftedRebornNalaPathOfBasicNumeracy, path: giftedPathOfBasicNumeracy, known: true },
  {
    held: giftedRebornNalaPathOfLinguisticsEnglish,
    path: giftedPathOfLinguisticsEnglish,
    known: true,
  },
  { held: giftedRebornNalaPathOfEavesdropping, path: giftedPathOfEavesdropping, known: false },
  { held: giftedRebornNalaPathOfEndurance, path: giftedPathOfEndurance, known: false },
  { held: giftedRebornNalaPathOfWillpower, path: giftedPathOfWillpower, known: false },
]

const PRACTICE = z
  .object({
    path: z.string().trim().min(1),
    experience: z.number().int().min(0),
    ...SPEED,
  })
  .refine(oneSpeed, ONE_SPEED)

const PRACTISED = z.object({
  gained: z.number().int().min(0),
  experience: z.number().int().min(0),
  tier: z.number().int().min(0),
})

type Practised = z.infer<typeof PRACTISED>

type Settled = { readonly answered: Practised } | { readonly refused: string }

type Next = {
  readonly reading: unknown
  readonly crossed: readonly string[]
  readonly left: string | null
}

function addressOf(type: string, slug: string): string {
  return `${type}/${slug}`
}

function pathOf(said: string): (typeof PATHS)[number] | undefined {
  return PATHS.find((one) => addressOf(characterSkill.slug, one.held.slug) === said)
}

function setAside(held: object): boolean {
  return Reflect.get(held, "dormant") === true
}

function tierOf(experience: number): number {
  return tiersPassed(BASIC_TIERS, experience)
}

export function settled(reading: unknown, roll: Rolled | null): Settled {
  if (roll === null) return { refused: "practice rolls its session, with `--dice 1d4`" }
  const held = PRACTICE.safeParse(reading)
  if (!held.success) return { refused: `practice reads so: ${z.prettifyError(held.error)}` }
  const one = pathOf(held.data.path)
  if (one === undefined) {
    const paths = PATHS.map((each) => `\`${addressOf(characterSkill.slug, each.held.slug)}\``)
    return {
      refused: `\`${held.data.path}\` is no Basic Path practice trains; say one of ${paths.join(", ")}`,
    }
  }
  if (setAside(one.held)) {
    return { refused: `${one.path.title} is set aside, so practice earns it no steps` }
  }
  const gained = sped(roll.total + (one.known ? KNOWN_STEPS : 0), held.data, Math.round)
  const experience = held.data.experience + gained
  return { answered: { gained, experience, tier: tierOf(experience) } }
}

export function added(reading: unknown, answered: unknown): readonly Added[] {
  const held = PRACTICE.safeParse(reading)
  const practised = PRACTISED.safeParse(answered)
  if (!held.success || !practised.success) return []
  const one = pathOf(held.data.path)
  if (one === undefined) return []
  const steps = {
    page: addressOf(characterSkill.slug, one.held.slug),
    key: "experience",
    by: practised.data.gained,
  }
  return [
    steps,
    ...basicPaid(one.held.attribute, tierOf(held.data.experience), practised.data.tier),
  ]
}

export function next(reading: unknown, answered: unknown): Next {
  const held = PRACTICE.parse(reading)
  const practised = PRACTISED.parse(answered)
  const title = pathOf(held.path)?.path.title ?? held.path
  const crossed: string[] = []
  for (let tier = tierOf(held.experience) + 1; tier <= practised.tier; tier++) {
    crossed.push(`${title} Tier ${tier}`)
  }
  return { reading: { ...held, experience: practised.experience }, crossed, left: null }
}
