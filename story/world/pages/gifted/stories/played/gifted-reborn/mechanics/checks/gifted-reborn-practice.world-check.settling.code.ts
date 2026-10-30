import type { Added } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import { tiersPassed } from "akasha/story/world/mechanics/modules/ability-slotting/ability-slotting.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import {
  BASIC_TIERS,
  basicPaid,
  ONE_SPEED,
  oneSpeed,
  SPEED,
  sped,
} from "akasha/story/world/mechanics/modules/gifted-path-stepping/gifted-path-stepping.module.code.ts"
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

const KNOWN_STEPS = 3

const STATS = `${giftedUnallocatedStats.slug}/${nalaUnallocatedStats.slug}`

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
    ...basicPaid(one.held.attribute, STATS, tierOf(held.data.experience), practised.data.tier),
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
