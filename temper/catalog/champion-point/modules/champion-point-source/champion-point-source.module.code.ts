import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type { ChampionStarId } from "akasha/temper/catalog/champion-point/modules/champion-star-ids/champion-star-ids.data-table.code.ts"
import { temperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.ts"
import { inGearOrder } from "akasha/temper/catalog/gear/equipment/modules/held-gear-table/held-gear-table.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import { tableView } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import { sourceEffectsOf } from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"

type ChampionPointSubcategoryId =
  | "craft-passives"
  | "craft-slottables"
  | "warfare-passives"
  | "warfare-slottables"
  | "fitness-passives"
  | "fitness-slottables"

interface ChampionPointTemplate extends EffectSourceInterface<"champion-points", Effect> {
  categoryId: "champion-points"
  subcategoryId: ChampionPointSubcategoryId
  name: string
  description: string
  esoChampionSkillId: number
  isSlottable: boolean
}

type Row = Readonly<Record<string, unknown>>

type Read = readonly [string, readonly string[]]

const CONSTELLATIONS: readonly string[] = ["craft", "fitness", "warfare"]

export const CHAMPION_STAR_READS: readonly Read[] = [
  [
    temperChampionStar.slug,
    [
      "slug",
      "title",
      "description",
      "esoChampionSkillId",
      "championConstellation",
      "isSlottable",
      "effects",
      "hashPlace",
    ],
  ],
]

export type ChampionPointId = ChampionStarId

export type ChampionPointSource = ChampionPointTemplate & { id: ChampionPointId }

type Stars = DataFile<ChampionPointId, ChampionPointSource, ChampionPointSubcategoryId>

const UNREAD =
  "the champion stars are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class StarsUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "StarsUnread"
  }
}

let held: Stars | null = null

function heldStars(): Stars {
  if (held === null) throw new StarsUnread()
  return held
}

export const championPoints: Stars = tableView(heldStars)

function starOf(row: Row): ChampionPointSource {
  const at = `the champion star page \`${String(row.slug)}\``
  const constellation = String(row.championConstellation)
  if (!CONSTELLATIONS.includes(constellation)) throw new Error(`${at} names no constellation`)
  if (typeof row.esoChampionSkillId !== "number") throw new Error(`${at} states no game number`)
  const slottable = row.isSlottable === true
  return {
    id: String(row.slug) as ChampionPointId,
    name: String(row.title),
    description: String(row.description),
    categoryId: "champion-points",
    subcategoryId:
      `${constellation}-${slottable ? "slottables" : "passives"}` as ChampionPointSubcategoryId,
    esoChampionSkillId: row.esoChampionSkillId,
    isSlottable: slottable,
    effects: sourceEffectsOf(row, at),
  }
}

export function holdChampionStars(pages: Iterable<Row>): undefined {
  const stars = inGearOrder(pages, "hashPlace").map(starOf)
  held = createDataFile<ChampionPointSource>()(
    Object.fromEntries(stars.map((star) => [star.id, star])) as Record<
      ChampionPointId,
      ChampionPointSource
    >
  )
  return undefined
}
