import type { PageType } from "@akasha/pages-system/page-type"
import type { AbilityId } from "../properties/ability-id.number-property.ts"
import type { AlternateAbilityIds } from "../properties/alternate-ability-ids.number-property.ts"
import type { Tags } from "../properties/tags.text-property.ts"
import type { ValidRoles } from "../properties/valid-roles.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-thing.page-type.ts"

export type TemperCompanionSkill = TemperCompanionThing & {
  abilityId: AbilityId
  validRoles?: readonly ValidRoles[]
  tags?: readonly Tags[]
  alternateAbilityIds?: readonly AlternateAbilityIds[]
}

export const temperCompanionSkill = {
  id: "01a05fcf-90fc-73a8-ad6a-e3869228a309",
  pageTypeSlug: "page-type",
  slug: "temper-companion-skill",
  definition: "an ability a companion slots",
  pluralSlug: "temper-companion-skills",
  extendsSlug: "page-type/temper-companion-thing",
  partSlugs: [
    "number-property/ability-id",
    "number-property/alternate-ability-ids",
    "text-property/tags",
    "text-property/valid-roles",
  ],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "companion-id", required: true, many: false },
    { pagePropertySlug: "ability-id", required: true, many: false },
    { pagePropertySlug: "skill-line-id", required: true, many: false },
    { pagePropertySlug: "skill-type", required: true, many: false },
    { pagePropertySlug: "description", required: true, many: false },
    { pagePropertySlug: "valid-roles", required: false, many: true, max: null },
    { pagePropertySlug: "tags", required: false, many: true, max: null },
    { pagePropertySlug: "alternate-ability-ids", required: false, many: true, max: null },
  ],
} as const satisfies PageType
