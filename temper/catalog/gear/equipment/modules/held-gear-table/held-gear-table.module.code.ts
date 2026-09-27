import {
  createDataFile,
  type DataFile,
} from "akasha/code/type/narrowing/modules/create-data-file/create-data-file.module.code.ts"
import { tableView } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

type Row = Readonly<Record<string, unknown>>

export type HeldGearTable<K extends string, V> = {
  readonly hold: (read: DataFile<K, V>) => DataFile<K, V>
  readonly table: DataFile<K, V>
}

class GearUnread extends Error {
  constructor(what: string) {
    super(
      `the ${what} are read with the skill catalogue, and nothing has read them yet — gate the screen on \`SkillCatalogGate\`, or await \`loadSkillCatalog()\` where the work starts`
    )
    this.name = "GearUnread"
  }
}

export function heldGearTable<K extends string, V>(what: string): HeldGearTable<K, V> {
  let held: DataFile<K, V> | null = null
  const read = (): DataFile<K, V> => {
    if (held === null) throw new GearUnread(what)
    return held
  }
  return {
    hold: (one) => {
      held = one
      return one
    },
    table: tableView(read),
  }
}

export function gearTableOf<V extends { readonly id: string; readonly name: string }>(
  rows: readonly V[]
): DataFile<V["id"], V> {
  const byId = Object.fromEntries(rows.map((row) => [row.id, row])) as Record<V["id"], V>
  return createDataFile<V>()(byId)
}

export function inGearOrder(rows: Iterable<Row>, field: string): readonly Row[] {
  const at = (row: Row): number => {
    const said = row[field]
    if (typeof said !== "number") {
      throw new Error(
        `the ${String(row.type ?? "gear")} page \`${String(row.slug)}\` states no ${field}`
      )
    }
    return said
  }
  return [...rows].sort((one, other) => at(one) - at(other))
}

export function slugOf(named: unknown): string {
  return typeof named === "string" ? named.slice(named.lastIndexOf("/") + 1) : ""
}
