import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import {
  type CompanionCatalog,
  catalogOf,
  heldCompanionCatalog,
  holdCompanionCatalog,
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
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"
import {
  companionTraitsFrom,
  GRADE_KEYS,
  TRAIT_KEYS,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-trait-reading/companion-trait-reading.module.code.ts"
import { temperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.ts"
import { temperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"
import { temperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.ts"
import { temperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.ts"

const EVERY = 500

type Row = Readonly<Record<string, unknown>>

async function rowsOf(pageTypeSlug: string, select: readonly string[]): Promise<readonly Row[]> {
  const { rows } = await getPages({ pageTypeSlug, select: [...select], limit: EVERY })
  return rows
}

export async function loadCompanionCatalog(): Promise<CompanionCatalog> {
  const already = heldCompanionCatalog()
  if (already !== null) return already
  const [companions, skills, skillLines, traits, grades] = await Promise.all([
    rowsOf(temperEsoCompanion.slug, COMPANION_KEYS),
    rowsOf(temperCompanionSkill.slug, SKILL_KEYS),
    rowsOf(temperCompanionSkillLine.slug, SKILL_LINE_KEYS),
    rowsOf(temperCompanionTrait.slug, TRAIT_KEYS),
    rowsOf(temperCompanionTraitGrade.slug, GRADE_KEYS),
  ])
  return holdCompanionCatalog(
    catalogOf(
      companionsFrom(companions),
      companionSkillsFrom(skills),
      companionSkillLinesFrom(skillLines),
      companionTraitsFrom(traits, grades)
    )
  )
}
