import {
  type CompanionCatalog,
  type CompanionRoleTemplate,
  catalogOf,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import {
  COMPANION_KEYS,
  companionsFrom,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-reading/companion-reading.module.code.ts"
import {
  companionSkillLinesFrom,
  SKILL_LINE_KEYS,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-line-reading/companion-skill-line-reading.module.code.ts"
import {
  companionSkillsFrom,
  SKILL_KEYS,
  textIn,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"
import {
  companionTraitsFrom,
  GRADE_KEYS,
  TRAIT_KEYS,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-trait-reading/companion-trait-reading.module.code.ts"
import { temperCompanionRole } from "akasha/temper/catalog/companion/role/temper-companion-role.page-type.ts"
import { temperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.ts"
import { temperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"
import { temperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.ts"
import { temperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.ts"

type Row = Readonly<Record<string, unknown>>

export type RowsOf = (pageTypeSlug: string) => readonly Row[]

const NAMED_KEYS: readonly string[] = ["slug", "key", "title"]

export const CATALOG_READS: readonly (readonly [string, readonly string[]])[] = [
  [temperEsoCompanion.slug, COMPANION_KEYS],
  [temperCompanionSkill.slug, SKILL_KEYS],
  [temperCompanionSkillLine.slug, SKILL_LINE_KEYS],
  [temperCompanionTrait.slug, TRAIT_KEYS],
  [temperCompanionTraitGrade.slug, GRADE_KEYS],
  [temperCompanionRole.slug, NAMED_KEYS],
]

function namedFrom(rows: readonly Row[]): readonly CompanionRoleTemplate[] {
  return rows
    .map((row) => {
      const at = String(row.slug ?? row.key ?? "a companion role")
      return { id: textIn(row.key, "key", at), name: textIn(row.title, "title", at) }
    })
    .sort((one, other) => (one.id < other.id ? -1 : 1))
}

export function companionCatalogFrom(rowsOf: RowsOf): CompanionCatalog {
  return catalogOf({
    companions: companionsFrom(rowsOf(temperEsoCompanion.slug)),
    skills: companionSkillsFrom(rowsOf(temperCompanionSkill.slug)),
    skillLines: companionSkillLinesFrom(rowsOf(temperCompanionSkillLine.slug)),
    traits: companionTraitsFrom(
      rowsOf(temperCompanionTrait.slug),
      rowsOf(temperCompanionTraitGrade.slug)
    ),
    roles: namedFrom(rowsOf(temperCompanionRole.slug)),
  })
}
