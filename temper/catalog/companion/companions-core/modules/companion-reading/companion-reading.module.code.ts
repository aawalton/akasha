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

export function inHashPlace<Held extends { readonly id: string }>(
  rows: readonly Row[],
  what: string,
  heldOf: (row: Row, at: string) => Held
): readonly Held[] {
  const placed = rows
    .map((row) => {
      const at = String(row.slug ?? row.key ?? what)
      return { place: numberIn(row.hashPlace, "hashPlace", at), held: heldOf(row, at) }
    })
    .sort((one, other) => one.place - other.place)
  return placed.map(({ place, held }, at) => {
    if (place !== at) {
      throw new Error(`the ${what} ${held.id} states place ${place}, and its place is ${at}`)
    }
    return held
  })
}

export function companionsFrom(rows: readonly Row[]): readonly CompanionTemplate[] {
  return inHashPlace(rows, "companion", (row, at) => ({
    id: textIn(row.key, "key", at),
    name: textIn(row.title, "title", at),
    esoCompanionId: numberIn(row.esoCompanionId, "esoCompanionId", at),
    classPassiveId: typeof row.classPassiveId === "string" ? row.classPassiveId : null,
  }))
}
