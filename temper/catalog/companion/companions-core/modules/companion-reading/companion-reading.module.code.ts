import type { CompanionTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import {
  numberIn,
  textIn,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"

type Row = Readonly<Record<string, unknown>>

export const COMPANION_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "esoCompanionId",
  "classPassiveId",
  "hashPlace",
]

type Placed = { readonly place: number; readonly companion: CompanionTemplate }

function placedOf(row: Row): Placed {
  const at = String(row.slug ?? row.key ?? "a companion")
  return {
    place: numberIn(row.hashPlace, "hashPlace", at),
    companion: {
      id: textIn(row.key, "key", at),
      name: textIn(row.title, "title", at),
      esoCompanionId: numberIn(row.esoCompanionId, "esoCompanionId", at),
      classPassiveId: typeof row.classPassiveId === "string" ? row.classPassiveId : null,
    },
  }
}

export function companionsFrom(rows: readonly Row[]): readonly CompanionTemplate[] {
  const placed = rows.map(placedOf).sort((one, other) => one.place - other.place)
  return placed.map(({ place, companion }, at) => {
    if (place !== at) {
      throw new Error(`the companion ${companion.id} states place ${place}, and its place is ${at}`)
    }
    return companion
  })
}
