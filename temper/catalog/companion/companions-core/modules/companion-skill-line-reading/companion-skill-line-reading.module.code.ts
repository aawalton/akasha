import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.ts"

export type CompanionSkillLineCategory = "class" | "weapon" | "guild" | "armor"

export interface CompanionSkillLine {
  readonly id: string
  readonly title: string
  readonly companionId: string | null
  readonly category: CompanionSkillLineCategory
}

const CATEGORIES: readonly CompanionSkillLineCategory[] = ["class", "weapon", "guild", "armor"]

function categoryIn(said: unknown, at: string): CompanionSkillLineCategory {
  for (const one of CATEGORIES) {
    if (said === one) return one
  }
  throw new Error(`${at} states \`${String(said)}\`, and a skill line is ${CATEGORIES.join(", ")}`)
}

function titleIn(said: unknown, at: string): string {
  if (typeof said === "string" && said !== "") return said
  throw new Error(`${at} states no title`)
}

export async function readCompanionSkillLines(): Promise<readonly CompanionSkillLine[]> {
  const { rows } = await getPages({
    pageTypeSlug: temperCompanionSkillLine.slug,
    select: ["slug", "title", "category", "companionId", "displayOrder"],
    order: [{ by: "displayOrder", dir: "asc" }],
    limit: 500,
  })
  return rows.map((row) => {
    const at = row.slug ?? row.id
    return {
      id: at,
      title: titleIn(row.title, at),
      companionId: slugAt(row, "companionId"),
      category: categoryIn(row.category, at),
    }
  })
}
