import {
  type CompanionCatalog,
  catalogOf,
  heldCompanionCatalog,
  holdCompanionCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import { readCompanionSkillLines } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-line-reading/companion-skill-line-reading.module.code.ts"
import { readCompanionSkills } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"

export async function loadCompanionCatalog(): Promise<CompanionCatalog> {
  const already = heldCompanionCatalog()
  if (already !== null) return already
  const [skills, skillLines] = await Promise.all([readCompanionSkills(), readCompanionSkillLines()])
  return holdCompanionCatalog(catalogOf(skills, skillLines))
}
