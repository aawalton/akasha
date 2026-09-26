import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type {
  CompanionSkillLineCategory,
  CompanionSkillLineTemplate,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import { textIn } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"

const CATEGORIES: readonly CompanionSkillLineCategory[] = ["class", "weapon", "guild", "armor"]

function categoryIn(said: unknown, at: string): CompanionSkillLineCategory {
  for (const one of CATEGORIES) {
    if (said === one) return one
  }
  throw new Error(`${at} states \`${String(said)}\`, and a skill line is ${CATEGORIES.join(", ")}`)
}

export const SKILL_LINE_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "category",
  "companionId",
  "displayOrder",
]

type Row = Readonly<Record<string, unknown>>

function orderOf(row: Row): number {
  return typeof row.displayOrder === "number" ? row.displayOrder : Number.POSITIVE_INFINITY
}

function byOrder(one: Row, other: Row): number {
  return orderOf(one) - orderOf(other) || (String(one.slug) < String(other.slug) ? -1 : 1)
}

export function companionSkillLinesFrom(
  rows: readonly Row[]
): readonly CompanionSkillLineTemplate[] {
  return [...rows].sort(byOrder).map((row) => {
    const at = String(row.slug ?? row.id)
    return {
      id: textIn(row.key, "key", at),
      name: textIn(row.title, "title", at),
      companionId: slugAt(row, "companionId"),
      category: categoryIn(row.category, at),
    }
  })
}
