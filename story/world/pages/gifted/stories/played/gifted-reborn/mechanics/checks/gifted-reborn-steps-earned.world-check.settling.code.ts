import type { Added } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import { tiersPassed } from "akasha/story/world/mechanics/modules/ability-slotting/ability-slotting.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import {
  BASIC_TIERS,
  basicPaid,
  type HeldPath,
  ONE_SPEED,
  oneSpeed,
  PATHS_INDEXED,
  type PathReach,
  SPEED,
  type Speed,
  sped,
  unallocated,
} from "akasha/story/world/mechanics/modules/gifted-path-stepping/gifted-path-stepping.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { giftedPathOfSoulstealing } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-soulstealing.world-skill.ts"
import { giftedPathOfTheCompletionist } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-the-completionist.world-skill.ts"
import { z } from "zod"

const COMPLETED = { basic: 10, elite: 40 }

const COMPLETIONIST_STATS = [3, 3]

type Kind = "basic" | "advanced" | "elite"

type Listed = {
  readonly held: HeldPath
  readonly title: string
  readonly tiers: readonly number[]
  readonly kind: Kind | null
  readonly apart: string
  readonly completes: boolean
  readonly paid: (from: number, to: number) => readonly Added[]
}

type Stats = () => string

function completionistPaid(stats: Stats, from: number, to: number): readonly Added[] {
  const gained = COMPLETIONIST_STATS.slice(from, to).reduce((sum, one) => sum + one, 0)
  return gained > 0 ? [unallocated(stats(), gained)] : []
}

function basic(held: HeldPath, attribute: string, stats: Stats): Listed {
  return {
    held,
    title: held.title,
    tiers: BASIC_TIERS,
    kind: "basic",
    apart: "",
    completes: false,
    paid: (from, to) => basicPaid(attribute, stats(), from, to),
  }
}

function mutated(held: HeldPath): Listed {
  return {
    held,
    title: held.title,
    tiers: held.tiers,
    kind: null,
    apart: "is a mutated Path, which takes no steps from an Achievement",
    completes: false,
    paid: () => [],
  }
}

function completionist(held: HeldPath, stats: Stats): Listed {
  return {
    held,
    title: held.title,
    tiers: held.tiers,
    kind: "advanced",
    apart: "",
    completes: true,
    paid: (from, to) => completionistPaid(stats, from, to),
  }
}

type Apart = {
  readonly title: string
  readonly listed: (held: HeldPath, stats: Stats) => Listed
}

const APART: readonly Apart[] = [
  { title: giftedPathOfSoulstealing.title, listed: mutated },
  { title: giftedPathOfTheCompletionist.title, listed: completionist },
]

function pathsOf(character: string | null, reach: PathReach): readonly Listed[] {
  if (character === null) return []
  const held = reach.heldBy(character)
  const stats = () => reach.statsOf(character)
  const basics = held.flatMap((one) =>
    one.attribute === null ? [] : [basic(one, one.attribute, stats)]
  )
  const apart = APART.flatMap((rule) =>
    held.filter((one) => one.title === rule.title).map((one) => rule.listed(one, stats))
  )
  return [...basics, ...apart]
}

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

const EARNING = z
  .object({ character: z.string().min(1).optional(), earned: z.array(ENTRY).min(1), ...SPEED })
  .refine(oneSpeed, ONE_SPEED)

type Earning = z.infer<typeof EARNING>

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

function ownerOf(earning: Earning, reach: PathReach): string | null {
  return earning.character ?? reach.ownerOf(earning.earned[0]?.path ?? "")
}

function pathOf(paths: readonly Listed[], said: string): Listed | undefined {
  return paths.find((one) => one.held.address === said)
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

function unpaid(said: string, paths: readonly Listed[]): Paid {
  if (paths.length === 0) {
    const shown = `\`${characterSkill.slug}/<slug>\``
    return { refused: `\`${said}\` is no Path this check pays; name a Path held, as ${shown}` }
  }
  const named = paths.map((each) => `\`${each.held.address}\``)
  return { refused: `\`${said}\` is no Path this check pays; say one of ${named.join(", ")}` }
}

function paidTo(entry: Entry, speed: Speed, paths: readonly Listed[]): Paid {
  const one = pathOf(paths, entry.path)
  if (one === undefined) return unpaid(entry.path, paths)
  if (one.held.setAside) return { refused: `${one.title} is set aside, so it earns no steps` }
  const steps = stepsOf(one, entry)
  if (typeof steps === "string") return { refused: steps }
  const gained = sped(steps, speed, Math.floor)
  const experience = entry.experience + gained
  const tier = tiersPassed(one.tiers, experience)
  const crossed = crossings(one, tiersPassed(one.tiers, entry.experience), tier)
  return { answered: { path: entry.path, gained, experience, tier, crossed: [...crossed] } }
}

export function settled(
  reading: unknown,
  roll: Rolled | null,
  reach: PathReach = PATHS_INDEXED
): Settled {
  if (roll !== null) return { refused: "steps earned roll no dice, so name none" }
  const held = EARNING.safeParse(reading)
  if (!held.success) return { refused: `steps earned read so: ${z.prettifyError(held.error)}` }
  const named = held.data.earned.map((one) => one.path)
  const twice = named.find((one, at) => named.indexOf(one) !== at)
  if (twice !== undefined) return { refused: `\`${twice}\` is named twice; name each Path once` }
  const paths = pathsOf(ownerOf(held.data, reach), reach)
  const earned: Earned[] = []
  for (const entry of held.data.earned) {
    const paid = paidTo(entry, held.data, paths)
    if ("refused" in paid) return paid
    earned.push(paid.answered)
  }
  return { answered: { earned } }
}

export function added(
  reading: unknown,
  answered: unknown,
  reach: PathReach = PATHS_INDEXED
): readonly Added[] {
  const earning = EARNING.safeParse(reading)
  const said = ANSWERED.safeParse(answered)
  if (!earning.success || !said.success) return []
  const paths = pathsOf(ownerOf(earning.data, reach), reach)
  return said.data.earned.flatMap((one) => {
    const path = pathOf(paths, one.path)
    if (path === undefined) return []
    const from = tiersPassed(path.tiers, one.experience - one.gained)
    return [{ page: one.path, key: "experience", by: one.gained }, ...path.paid(from, one.tier)]
  })
}
