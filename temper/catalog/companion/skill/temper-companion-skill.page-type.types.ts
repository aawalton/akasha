import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { AbilityId } from "akasha/temper/catalog/companion/skill/properties/ability-id.number-property.types.ts"
import type { AlternateAbilityIds } from "akasha/temper/catalog/companion/skill/properties/alternate-ability-ids.number-property.types.ts"
import type { CastConditions } from "akasha/temper/catalog/companion/skill/properties/cast-conditions.page-property-entry.types.ts"
import type { SkillEffects } from "akasha/temper/catalog/companion/skill/properties/skill-effects.page-property-entry.types.ts"
import type { Tags } from "akasha/temper/catalog/companion/skill/properties/tags.text-property.types.ts"
import type { ValidRoles } from "akasha/temper/catalog/companion/skill/properties/valid-roles.text-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/companion/thing/temper-companion-thing.page-type.types.ts"
import type { SkillLineId } from "akasha/temper/catalog/thing/properties/skill-line-id.text-property.types.ts"
import type { SkillType } from "akasha/temper/catalog/thing/properties/skill-type.relation-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionSkill = TemperCompanionThing & {
  key: Key
  abilityId: AbilityId
  skillLineId: SkillLineId
  skillType: SkillType
  description: Description
  validRoles?: ValidRoles
  tags?: Tags
  alternateAbilityIds?: AlternateAbilityIds
  skillEffects?: SkillEffects
  castConditions?: CastConditions
}
