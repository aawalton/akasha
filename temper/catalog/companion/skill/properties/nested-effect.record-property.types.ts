import type { CarriedEffect } from "akasha/temper/catalog/companion/skill/properties/carried-effect.one-of-property.types.ts"
import type { Duration } from "akasha/temper/catalog/companion/skill/properties/duration.number-property.types.ts"
import type { EffectConditions } from "akasha/temper/catalog/companion/skill/properties/effect-conditions.record-property.types.ts"
import type { EffectFormula } from "akasha/temper/catalog/companion/skill/properties/effect-formula.record-property.types.ts"
import type { EffectStatus } from "akasha/temper/catalog/companion/skill/properties/effect-status.record-property.types.ts"
import type { EffectTarget } from "akasha/temper/catalog/companion/skill/properties/effect-target.record-property.types.ts"
import type { SkillEffectType } from "akasha/temper/catalog/companion/skill/properties/skill-effect-type.text-property.types.ts"
import type { DamageType } from "akasha/temper/character/skill-activation/properties/damage-type.text-property.types.ts"

export type NestedEffect = {
  type?: SkillEffectType
  target?: EffectTarget
  formula?: EffectFormula
  status?: EffectStatus
  conditions?: EffectConditions
  damageType?: DamageType
  duration?: Duration
  effect?: CarriedEffect
}
