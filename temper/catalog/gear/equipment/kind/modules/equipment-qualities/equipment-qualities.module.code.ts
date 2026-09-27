import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import type {
  GradedQualityId,
  UngradedQualityId,
} from "akasha/temper/catalog/gear/temper-quality/modules/quality-ids/quality-ids.data-table.code.ts"

export type EquipmentQualityOptionId = GradedQualityId | UngradedQualityId

export type EquipmentQualityId = GradedQualityId

interface EquipmentQualityTemplate {
  readonly id: EquipmentQualityOptionId
  readonly name: string
  readonly available: boolean
}

type Qualities = DataFile<EquipmentQualityOptionId, EquipmentQualityTemplate>

type Row = Readonly<Record<string, unknown>>

const UNREAD =
  "the qualities are read with the skill catalogue, and nothing has read them yet — gate the screen on `SkillCatalogGate`, or await `loadSkillCatalog()` where the work starts"

class QualitiesUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "QualitiesUnread"
  }
}

function placed(row: Row): readonly [number, EquipmentQualityTemplate] {
  const at = `the quality page \`${String(row.slug)}\``
  if (typeof row.hashPlace !== "number") throw new Error(`${at} states no hash place`)
  if (typeof row.title !== "string") throw new Error(`${at} states no title`)
  return [
    row.hashPlace,
    {
      id: String(row.slug) as EquipmentQualityOptionId,
      name: row.title,
      available: row.available === true,
    },
  ]
}

export function qualitiesOf(pages: Iterable<Row>): Qualities {
  const read = [...pages].map(placed).sort(([one], [two]) => one - two)
  const byId = Object.fromEntries(read.map(([, one]) => [one.id, one])) as Record<
    EquipmentQualityOptionId,
    EquipmentQualityTemplate
  >
  return createDataFile<EquipmentQualityTemplate>()(byId)
}

let held: Qualities | null = null

export function holdQualities(read: Qualities): Qualities {
  held = read
  return read
}

export function equipmentQualities(): Qualities {
  if (held === null) throw new QualitiesUnread()
  return held
}

export function resolveQuality(quality: EquipmentQualityOptionId | undefined): EquipmentQualityId {
  if (quality == null || quality === "no-quality") return "legendary"
  if (quality === "mythic") return "legendary"
  return quality
}

export function minQuality(a: EquipmentQualityId, b: EquipmentQualityId): EquipmentQualityId {
  const ids: readonly string[] = equipmentQualities().ids
  return ids.indexOf(a) <= ids.indexOf(b) ? a : b
}
