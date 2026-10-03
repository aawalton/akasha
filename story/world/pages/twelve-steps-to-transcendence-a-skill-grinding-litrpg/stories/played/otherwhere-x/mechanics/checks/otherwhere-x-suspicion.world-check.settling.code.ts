import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { otherwhereXSuspicion } from "akasha/story/world/pages/twelve-steps-to-transcendence-a-skill-grinding-litrpg/stories/played/otherwhere-x/mechanics/metrics/attributes/suspicion/otherwhere-x-suspicion.page-type.ts"
import { z } from "zod"

const WEIGHS = {
  noToken: 2,
  strangeClothes: 1,
  noHome: 1,
  aloneAndCalm: 2,
  nearTheSurge: 2,
  unknownTongue: 2,
  deadFace: 3,
  lieFoundOut: 3,
  fledOrFought: 4,
  refusedTablet: 6,
} as const

const EASES = {
  vouched: 2,
  honestWork: 1,
  openAnswers: 1,
  roadToken: 3,
} as const

type Mark = keyof typeof WEIGHS

type Ease = keyof typeof EASES

const FLAG = z.boolean().default(false)

const LOOK = z.object({
  character: z.string().trim().min(1),
  suspicion: z.number().int().min(0),
  marks: z
    .object({
      noToken: FLAG,
      strangeClothes: FLAG,
      noHome: FLAG,
      aloneAndCalm: FLAG,
      nearTheSurge: FLAG,
      unknownTongue: FLAG,
      deadFace: FLAG,
      lieFoundOut: FLAG,
      fledOrFought: FLAG,
      refusedTablet: FLAG,
    })
    .strict()
    .prefault({}),
  eased: z
    .object({ vouched: FLAG, honestWork: FLAG, openAnswers: FLAG, roadToken: FLAG })
    .strict()
    .prefault({}),
  tabletCleared: FLAG,
})

const STANCES = [
  { under: 3, stance: "unremarked" },
  { under: 6, stance: "questioned" },
  { under: 10, stance: "watched" },
  { under: 14, stance: "held" },
  { under: Number.POSITIVE_INFINITY, stance: "seized" },
] as const

const MOST_SUSPICION = 20

type Looked = {
  readonly raised: number
  readonly eased: number
  readonly change: number
  readonly suspicion: number
  readonly stance: (typeof STANCES)[number]["stance"]
}

type Settled = { readonly answered: Looked } | { readonly refused: string }

type Added = { readonly page: string; readonly key: string; readonly by: number }

function stanceOf(suspicion: number): Looked["stance"] {
  return STANCES.find((one) => suspicion < one.under)?.stance ?? "seized"
}

export function settled(reading: unknown): Settled {
  const held = LOOK.safeParse(reading)
  if (!held.success) return { refused: `a look reads so: ${z.prettifyError(held.error)}` }
  const { suspicion, marks, eased, tabletCleared } = held.data
  const markNames = Object.keys(WEIGHS) as Mark[]
  const easeNames = Object.keys(EASES) as Ease[]
  const raised = markNames.reduce((sum, mark) => sum + (marks[mark] ? WEIGHS[mark] : 0), 0)
  const easedBy = easeNames.reduce((sum, ease) => sum + (eased[ease] ? EASES[ease] : 0), 0)
  const reached = tabletCleared
    ? 0
    : Math.min(MOST_SUSPICION, Math.max(0, suspicion + raised - easedBy))
  return {
    answered: {
      raised,
      eased: easedBy,
      change: reached - suspicion,
      suspicion: reached,
      stance: stanceOf(reached),
    },
  }
}

export function added(reading: unknown, answered: unknown): readonly Added[] {
  const held = LOOK.safeParse(reading)
  const looked = answered as Looked
  if (!held.success || looked.change === 0) return []
  return [
    {
      page: `${otherwhereXSuspicion.slug}/${slugOf(held.data.character)}`,
      key: "value",
      by: looked.change,
    },
  ]
}
