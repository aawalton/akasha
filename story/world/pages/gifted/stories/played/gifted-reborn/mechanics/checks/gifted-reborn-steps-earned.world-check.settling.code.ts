import type { Added } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import { tiersPassed } from "akasha/story/world/mechanics/modules/ability-slotting/ability-slotting.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { giftedPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-basic-numeracy.world-skill.ts"
import { giftedPathOfEavesdropping } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-eavesdropping.world-skill.ts"
import { giftedPathOfEndurance } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-endurance.world-skill.ts"
import { giftedPathOfLinguisticsEnglish } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-linguistics-english.world-skill.ts"
import { giftedPathOfSoulstealing } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-soulstealing.world-skill.ts"
import { giftedPathOfTheCompletionist } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-the-completionist.world-skill.ts"
import { giftedPathOfWillpower } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-willpower.world-skill.ts"
import {
  BASIC_TIERS,
  basicPaid,
  heldNamed,
  ONE_SPEED,
  oneSpeed,
  SPEED,
  type Speed,
  setAside,
  sped,
  unallocated,
} from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/checks/gifted-reborn-practice.world-check.settling.code.ts"
import { giftedRebornNalaPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-basic-numeracy.character-skill.ts"
import { giftedRebornNalaPathOfEavesdropping } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-eavesdropping.character-skill.ts"
import { giftedRebornNalaPathOfEndurance } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-endurance.character-skill.ts"
import { giftedRebornNalaPathOfLinguisticsEnglish } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-linguistics-english.character-skill.ts"
import { giftedRebornNalaPathOfSoulstealing } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-soulstealing.character-skill.ts"
import { giftedRebornNalaPathOfTheCompletionist } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-the-completionist.character-skill.ts"
import { giftedRebornNalaPathOfWillpower } from "akasha/story/world/pages/gifted/stories/played/gifted-reborn/mechanics/skills-held/gifted-reborn-nala-path-of-willpower.character-skill.ts"
import { z } from "zod"

const COMPLETED = { basic: 10, elite: 40 }

const COMPLETIONIST_STATS = [3, 3]

type Kind = "basic" | "advanced" | "elite"

type Listed = {
  readonly held: { readonly slug: string }
  readonly title: string
  readonly tiers: readonly number[]
  readonly kind: Kind | null
  readonly apart: string
  readonly completes: boolean
  readonly paid: (from: number, to: number) => readonly Added[]
}

function completionistPaid(from: number, to: number): readonly Added[] {
  const stats = COMPLETIONIST_STATS.slice(from, to).reduce((sum, one) => sum + one, 0)
  return stats > 0 ? [unallocated(stats)] : []
}

function basic(
  held: { readonly slug: string; readonly attribute: string },
  path: { readonly title: string }
): Listed {
  return {
    held,
    title: path.title,
    tiers: BASIC_TIERS,
    kind: "basic",
    apart: "",
    completes: false,
    paid: (from, to) => basicPaid(held.attribute, from, to),
  }
}

const PATHS: readonly Listed[] = [
  basic(giftedRebornNalaPathOfBasicNumeracy, giftedPathOfBasicNumeracy),
  basic(giftedRebornNalaPathOfEavesdropping, giftedPathOfEavesdropping),
  basic(giftedRebornNalaPathOfEndurance, giftedPathOfEndurance),
  basic(giftedRebornNalaPathOfLinguisticsEnglish, giftedPathOfLinguisticsEnglish),
  basic(giftedRebornNalaPathOfWillpower, giftedPathOfWillpower),
  {
    held: giftedRebornNalaPathOfSoulstealing,
    title: giftedPathOfSoulstealing.title,
    tiers: giftedPathOfSoulstealing.tierSteps,
    kind: null,
    apart: "is a mutated Path, which takes no steps from an Achievement",
    completes: false,
    paid: () => [],
  },
  {
    held: giftedRebornNalaPathOfTheCompletionist,
    title: giftedPathOfTheCompletionist.title,
    tiers: giftedPathOfTheCompletionist.tierSteps,
    kind: "advanced",
    apart: "",
    completes: true,
    paid: completionistPaid,
  },
]

const OFFER = z.strictObject({
  basic: z.number().int().min(1).optional(),
  advanced: z.number().int().min(1).optional(),
  elite: z.number().int().min(1).optional(),
})

type Offer = z.infer<typeof OFFER>

const ENTRY = z
  .strictObject({
    path: z.string().trim().min(1),
    experience: z.number().int().min(0),
    deed: z.number().int().min(1).optional(),
    achievement: OFFER.optional(),
    completed: z.enum(["basic", "elite"]).optional(),
  })
  .refine(
    (one) =>
      [one.deed, one.achievement, one.completed].filter((it) => it !== undefined).length === 1,
    "an entry states one of `deed`, `achievement` or `completed`"
  )

type Entry = z.infer<typeof ENTRY>

const EARNING = z.object({ earned: z.array(ENTRY).min(1), ...SPEED }).refine(oneSpeed, ONE_SPEED)

const EARNED = z.object({
  path: z.string(),
  gained: z.number().int().min(0),
  experience: z.number().int().min(0),
  tier: z.number().int().min(0),
  crossed: z.array(z.string()),
})

type Earned = z.infer<typeof EARNED>

const ANSWERED = z.object({ earned: z.array(EARNED) })

type Settled =
  | { readonly answered: { readonly earned: readonly Earned[] } }
  | { readonly refused: string }

type Paid = { readonly answered: Earned } | { readonly refused: string }

function addressOf(type: string, slug: string): string {
  return `${type}/${slug}`
}

function pathOf(said: string): Listed | undefined {
  return heldNamed(PATHS, said)
}

function offered(one: Listed, offer: Offer | undefined): number | string {
  if (one.kind === null) return `${one.title} ${one.apart}`
  const steps = offer?.[one.kind]
  if (steps === undefined) {
    return `the Achievement offers no ${one.kind} Path steps, so ${one.title} cannot take them`
  }
  return steps
}

function stepsOf(one: Listed, entry: Entry): number | string {
  if (entry.achievement !== undefined) return offered(one, entry.achievement)
  if (entry.completed !== undefined) {
    if (one.completes) return COMPLETED[entry.completed]
    return `${one.title} earns nothing for a Path completed; the Completionist does`
  }
  if (one.completes) {
    return `${one.title} earns steps only from Paths completed and from Achievements`
  }
  return entry.deed ?? "an entry states one of `deed`, `achievement` or `completed`"
}

function crossings(one: Listed, from: number, to: number): readonly string[] {
  const crossed: string[] = []
  for (let tier = from + 1; tier <= to; tier++) crossed.push(`${one.title} Tier ${tier}`)
  return crossed
}

function paidTo(entry: Entry, speed: Speed): Paid {
  const one = pathOf(entry.path)
  if (one === undefined) {
    const paths = PATHS.map((each) => `\`${addressOf(characterSkill.slug, each.held.slug)}\``)
    return {
      refused: `\`${entry.path}\` is no Path this check pays; say one of ${paths.join(", ")}`,
    }
  }
  if (setAside(one.held)) return { refused: `${one.title} is set aside, so it earns no steps` }
  const steps = stepsOf(one, entry)
  if (typeof steps === "string") return { refused: steps }
  const gained = sped(steps, speed, Math.floor)
  const experience = entry.experience + gained
  const tier = tiersPassed(one.tiers, experience)
  const crossed = crossings(one, tiersPassed(one.tiers, entry.experience), tier)
  return { answered: { path: entry.path, gained, experience, tier, crossed: [...crossed] } }
}

export function settled(reading: unknown, roll: Rolled | null): Settled {
  if (roll !== null) return { refused: "steps earned roll no dice, so name none" }
  const held = EARNING.safeParse(reading)
  if (!held.success) return { refused: `steps earned read so: ${z.prettifyError(held.error)}` }
  const named = held.data.earned.map((one) => one.path)
  const twice = named.find((one, at) => named.indexOf(one) !== at)
  if (twice !== undefined) return { refused: `\`${twice}\` is named twice; name each Path once` }
  const earned: Earned[] = []
  for (const entry of held.data.earned) {
    const paid = paidTo(entry, held.data)
    if ("refused" in paid) return paid
    earned.push(paid.answered)
  }
  return { answered: { earned } }
}

export function added(reading: unknown, answered: unknown): readonly Added[] {
  const said = ANSWERED.safeParse(answered)
  if (!EARNING.safeParse(reading).success || !said.success) return []
  return said.data.earned.flatMap((one) => {
    const path = pathOf(one.path)
    if (path === undefined) return []
    const from = tiersPassed(path.tiers, one.experience - one.gained)
    return [{ page: one.path, key: "experience", by: one.gained }, ...path.paid(from, one.tier)]
  })
}
