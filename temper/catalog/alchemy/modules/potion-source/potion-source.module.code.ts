import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import { parseString } from "akasha/code/type/narrowing/modules/parse-string/parse-string.module.code.ts"
import { temperBuffMajor } from "akasha/temper/catalog/effect/temper-buff-major/temper-buff-major.page-type.ts"
import { temperBuffMinor } from "akasha/temper/catalog/effect/temper-buff-minor/temper-buff-minor.page-type.ts"
import { temperBuffOther } from "akasha/temper/catalog/effect/temper-buff-other/temper-buff-other.page-type.ts"
import { temperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.ts"
import { temperPotionCrafted } from "akasha/temper/catalog/gear/temper-potion-crafted/temper-potion-crafted.page-type.ts"
import { temperPotionCrown } from "akasha/temper/catalog/gear/temper-potion-crown/temper-potion-crown.page-type.ts"
import { temperPotionDropped } from "akasha/temper/catalog/gear/temper-potion-dropped/temper-potion-dropped.page-type.ts"
import { temperReagent } from "akasha/temper/catalog/gear/temper-reagent/temper-reagent.page-type.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"
import {
  entryEffectOf,
  inHashPlaces,
  type MetricNodes,
  metricNodesOf,
  recordsIn,
} from "akasha/temper/player/character/source/modules/source-effects-reading/source-effects-reading.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"

type Kind = "crafted" | "crown" | "dropped" | "none"

interface PotionsTemplate extends EffectSourceInterface {
  categoryId: "potions"
  subcategoryId: Kind
  name: string
  description: string
  itemId: number
  icon: string
  level: string
  seconds: number
  reagents?: readonly (readonly string[])[]
}

export type PotionId = string

export type PotionSource = PotionsTemplate

type Potions = DataFile<PotionId, PotionSource, Kind>

type Row = Readonly<Record<string, unknown>>

type Read = readonly [string, readonly string[]]

type Named = ReadonlyMap<string, string>

type Lookups = {
  readonly nodes: MetricNodes
  readonly buffs: Named
  readonly reagents: Named
}

const KINDS: readonly (readonly [pageTypeSlug: string, kind: Kind])[] = [
  [temperPotionCrown.slug, "crown"],
  [temperPotionDropped.slug, "dropped"],
  [temperPotionCrafted.slug, "crafted"],
]

const BUFF_TYPES: readonly string[] = [
  temperBuffMajor.slug,
  temperBuffMinor.slug,
  temperBuffOther.slug,
]

const FIELDS: readonly string[] = [
  "slug",
  "key",
  "title",
  "description",
  "icon",
  "level",
  "seconds",
  "effects",
  "hashPlace",
]

export const POTION_READS: readonly Read[] = [
  [temperPotionCrown.slug, [...FIELDS, "itemId"]],
  [temperPotionDropped.slug, [...FIELDS, "itemId"]],
  [temperPotionCrafted.slug, [...FIELDS, "recipes"]],
  [temperPotion.slug, ["slug", "key", "title", "hashPlace"]],
  [temperReagent.slug, ["slug", "title"]],
  ...BUFF_TYPES.map((pageTypeSlug): Read => [pageTypeSlug, ["slug", "key"]]),
  [temperMetricTree.slug, ["slug", "nodeId"]],
]

const UNREAD =
  "the potions are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class PotionsUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "PotionsUnread"
  }
}

function namedIn(
  rowsOf: (pageTypeSlug: string) => Iterable<Row>,
  pageTypeSlugs: readonly string[],
  field: string
): Named {
  const found = new Map<string, string>()
  for (const pageTypeSlug of pageTypeSlugs) {
    for (const row of rowsOf(pageTypeSlug)) {
      const said = row[field]
      if (typeof row.slug === "string" && typeof said === "string") {
        found.set(`${pageTypeSlug}/${row.slug}`, said)
      }
    }
  }
  return found
}

function nameOf(named: Named, said: unknown, at: string): string {
  const found = typeof said === "string" ? named.get(said) : undefined
  if (found === undefined) throw new Error(`${at} names \`${String(said)}\`, which is no page read`)
  return found
}

function effectOf(entry: Row, lookups: Lookups, at: string): Effect {
  if (entry.buffId === undefined) return entryEffectOf(entry, lookups.nodes, at)
  if (typeof entry.seconds !== "number") throw new Error(`${at} states a buff lasting no time`)
  return { buffId: nameOf(lookups.buffs, entry.buffId, at), seconds: entry.seconds }
}

function recipesOf(row: Row, lookups: Lookups, at: string): readonly (readonly string[])[] {
  return recordsIn(row.recipes).map((recipe) => {
    const reagents: readonly unknown[] = Array.isArray(recipe.reagents) ? recipe.reagents : []
    return reagents.map((reagent) => nameOf(lookups.reagents, reagent, at))
  })
}

function placed(row: Row, kind: Kind, lookups: Lookups): readonly [number, PotionSource] {
  const at = `the potion page \`${String(row.slug)}\``
  if (typeof row.hashPlace !== "number") throw new Error(`${at} states no hash place`)
  if (typeof row.key !== "string") throw new Error(`${at} states no key`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  return [
    row.hashPlace,
    {
      id: row.key,
      name: row.title,
      itemId: typeof row.itemId === "number" ? row.itemId : 0,
      icon: parseString(row.icon),
      seconds: typeof row.seconds === "number" ? row.seconds : 0,
      level: parseString(row.level),
      categoryId: "potions",
      subcategoryId: kind,
      description: parseString(row.description),
      effects: recordsIn(row.effects).map((entry) => effectOf(entry, lookups, at)),
      ...(kind === "crafted" ? { reagents: recipesOf(row, lookups, at) } : {}),
    },
  ]
}

export function potionsOf(rowsOf: (pageTypeSlug: string) => Iterable<Row>): Potions {
  const lookups: Lookups = {
    nodes: metricNodesOf(rowsOf(temperMetricTree.slug)),
    buffs: namedIn(rowsOf, BUFF_TYPES, "key"),
    reagents: namedIn(rowsOf, [temperReagent.slug], "title"),
  }
  const kinds = KINDS.flatMap(([pageTypeSlug, kind]) =>
    [...rowsOf(pageTypeSlug)].map((row) => placed(row, kind, lookups))
  )
  const seen = new Set(kinds.map(([, one]) => one.id))
  const none = [...rowsOf(temperPotion.slug)]
    .filter((row) => typeof row.hashPlace === "number" && !seen.has(String(row.key)))
    .map((row) => placed(row, "none", lookups))
  const read = inHashPlaces([...kinds, ...none])
  return createDataFile<PotionSource>()(Object.fromEntries(read.map((one) => [one.id, one])))
}

let held: Potions | null = null

export function holdPotions(read: Potions): Potions {
  held = read
  return read
}

export function potions(): Potions {
  if (held === null) throw new PotionsUnread()
  return held
}

export function potionAt(id: PotionId): PotionSource {
  const found = potions().data[id]
  if (found === undefined) throw new Error(`no potion page is \`${id}\``)
  return found
}
