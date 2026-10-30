import type { Added } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import { tiersPassed } from "akasha/story/world/mechanics/modules/ability-slotting/ability-slotting.module.code.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import {
  BASIC_TIERS,
  basicPaid,
  type HeldPath,
  heldNamed,
  ONE_SPEED,
  oneSpeed,
  type PathReach,
  pathsIndexed,
  SPEED,
  sped,
} from "akasha/story/world/mechanics/modules/path-stepping/path-stepping.module.code.ts"
import { characterSkill } from "akasha/story/world/mechanics/skills/character-skill/character-skill.page-type.ts"
import { gifted } from "akasha/story/world/pages/gifted/gifted.world.ts"
import { giftedUnallocatedStats } from "akasha/story/world/pages/gifted/mechanics/metrics/resources/unallocated-stats/gifted-unallocated-stats.page-type.ts"
import { giftedPathOfBasicNumeracy } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-basic-numeracy.world-skill.ts"
import { giftedPathOfLinguisticsEnglish } from "akasha/story/world/pages/gifted/mechanics/skills/gifted-path-of-linguistics-english.world-skill.ts"
import { z } from "zod"

const PATHS_INDEXED = pathsIndexed({ kind: giftedUnallocatedStats.slug, world: gifted.slug })

const KNOWN_STEPS = 3

const KNOWN: readonly string[] = [
  giftedPathOfBasicNumeracy.title,
  giftedPathOfLinguisticsEnglish.title,
]

type Listed = { readonly held: HeldPath; readonly attribute: string; readonly known: boolean }

const PRACTICE = z
  .object({
    character: z.string().min(1).optional(),
    path: z.string().trim().min(1),
    experience: z.number().int().min(0),
    ...SPEED,
  })
  .refine(oneSpeed, ONE_SPEED)

type Practice = z.infer<typeof PRACTICE>

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

function pathsOf(practice: Practice, reach: PathReach): readonly Listed[] {
  const character = practice.character ?? reach.ownerOf(practice.path)
  if (character === null) return []
  const listed = reach
    .heldBy(character)
    .flatMap((held) =>
      held.attribute === null
        ? []
        : [{ held, attribute: held.attribute, known: KNOWN.includes(held.title) }]
    )
  return [...listed.filter((one) => one.known), ...listed.filter((one) => !one.known)]
}

function untrained(said: string, paths: readonly Listed[]): Settled {
  if (paths.length === 0) {
    const shown = `\`${characterSkill.slug}/<slug>\``
    return {
      refused: `\`${said}\` is no Basic Path practice trains; name a Path held, as ${shown}`,
    }
  }
  const named = paths.map((each) => `\`${each.held.address}\``).join(", ")
  return { refused: `\`${said}\` is no Basic Path practice trains; say one of ${named}` }
}

function tierOf(experience: number): number {
  return tiersPassed(BASIC_TIERS, experience)
}

export function settled(
  reading: unknown,
  roll: Rolled | null,
  reach: PathReach = PATHS_INDEXED
): Settled {
  if (roll === null) return { refused: "practice rolls its session, with `--dice 1d4`" }
  const held = PRACTICE.safeParse(reading)
  if (!held.success) return { refused: `practice reads so: ${z.prettifyError(held.error)}` }
  const paths = pathsOf(held.data, reach)
  const one = heldNamed(paths, held.data.path)
  if (one === undefined) return untrained(held.data.path, paths)
  if (one.held.setAside) {
    return { refused: `${one.held.title} is set aside, so practice earns it no steps` }
  }
  const gained = sped(roll.total + (one.known ? KNOWN_STEPS : 0), held.data, Math.round)
  const experience = held.data.experience + gained
  return { answered: { gained, experience, tier: tierOf(experience) } }
}

export function added(
  reading: unknown,
  answered: unknown,
  reach: PathReach = PATHS_INDEXED
): readonly Added[] {
  const held = PRACTICE.safeParse(reading)
  const practised = PRACTISED.safeParse(answered)
  if (!held.success || !practised.success) return []
  const one = heldNamed(pathsOf(held.data, reach), held.data.path)
  if (one === undefined) return []
  const steps = { page: one.held.address, key: "experience", by: practised.data.gained }
  const from = tierOf(held.data.experience)
  const stats = reach.statsOf(one.held.character)
  return [steps, ...basicPaid(one.attribute, stats, from, practised.data.tier)]
}

export function next(reading: unknown, answered: unknown, reach: PathReach = PATHS_INDEXED): Next {
  const held = PRACTICE.parse(reading)
  const practised = PRACTISED.parse(answered)
  const title = heldNamed(pathsOf(held, reach), held.path)?.held.title ?? held.path
  const crossed: string[] = []
  for (let tier = tierOf(held.experience) + 1; tier <= practised.tier; tier++) {
    crossed.push(`${title} Tier ${tier}`)
  }
  return { reading: { ...held, experience: practised.experience }, crossed, left: null }
}
