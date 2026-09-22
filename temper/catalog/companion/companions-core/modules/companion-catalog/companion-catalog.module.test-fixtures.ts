import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  type CompanionCatalog,
  catalogOf,
  holdCompanionCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionSkillTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import type { CompanionSkillLineTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-line-reading/companion-skill-line-reading.module.code.ts"
import {
  conditionsIn,
  effectsIn,
  numbersIn,
  textIn,
  textsIn,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"
import { temperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.ts"
import { temperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.ts"

type Row = Readonly<Record<string, unknown>>

function rowsOf(pageTypeSlug: string, keys: readonly string[]): readonly Row[] {
  const asked = asking(akashaRoot(), { pageTypeSlug, keys } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  return asked.rows as readonly Row[]
}

function companionCatalogFromCheckout(): CompanionCatalog {
  const skills = rowsOf(temperCompanionSkill.slug, [
    "key",
    "title",
    "icon",
    "description",
    "abilityId",
    "companionId",
    "skillLineId",
    "skillType",
    "validRoles",
    "tags",
    "alternateAbilityIds",
    "skillEffects",
    "castConditions",
  ]).map(
    (row) =>
      ({
        id: textIn(row.key, "key", "a companion skill"),
        abilityId: typeof row.abilityId === "number" ? row.abilityId : 0,
        name: textIn(row.title, "title", "a companion skill"),
        icon: typeof row.icon === "string" ? row.icon : null,
        description: textIn(row.description, "description", "a companion skill"),
        companionId: slugAt(row, "companionId"),
        skillLineId: textIn(slugAt(row, "skillLineId"), "skillLineId", "a companion skill"),
        skillType: slugAt(row, "skillType") ?? "active",
        effects: effectsIn(row.skillEffects),
        castConditions: conditionsIn(row.castConditions),
        alternateAbilityIds: numbersIn(row.alternateAbilityIds),
        tags: textsIn(row.tags),
        validRoles: textsIn(row.validRoles),
      }) as CompanionSkillTemplate
  )

  const skillLines = rowsOf(temperCompanionSkillLine.slug, [
    "key",
    "title",
    "category",
    "companionId",
    "displayOrder",
  ]).map(
    (row) =>
      ({
        id: textIn(row.key, "key", "a companion skill line"),
        name: textIn(row.title, "title", "a companion skill line"),
        companionId: slugAt(row, "companionId"),
        category: textIn(row.category, "category", "a companion skill line"),
      }) as CompanionSkillLineTemplate
  )

  return catalogOf(skills, skillLines)
}

export function holdCompanionCatalogFromCheckout(): CompanionCatalog {
  return holdCompanionCatalog(companionCatalogFromCheckout())
}
