import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type {
  CompanionSkillLineCategory,
  CompanionSkillLineTemplate,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import { textIn } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"
import { temperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.ts"

const CATEGORIES: readonly CompanionSkillLineCategory[] = ["class", "weapon", "guild", "armor"]

function categoryIn(said: unknown, at: string): CompanionSkillLineCategory {
  for (const one of CATEGORIES) {
    if (said === one) return one
  }
  throw new Error(`${at} states \`${String(said)}\`, and a skill line is ${CATEGORIES.join(", ")}`)
}

export async function readCompanionSkillLines(): Promise<readonly CompanionSkillLineTemplate[]> {
  const { rows } = await getPages({
    pageTypeSlug: temperCompanionSkillLine.slug,
    select: ["slug", "key", "title", "category", "companionId", "displayOrder"],
    order: [{ by: "displayOrder", dir: "asc" }],
    limit: 500,
  })
  return rows.map((row) => {
    const at = row.slug ?? row.id
    return {
      id: textIn(row.key, "key", at),
      name: textIn(row.title, "title", at),
      companionId: slugAt(row, "companionId"),
      category: categoryIn(row.category, at),
    }
  })
}
