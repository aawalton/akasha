import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { AugmentDelay } from "akasha/temper/catalog/companion/skill/properties/augment-delay.boolean-property.types.ts"
import type { CarriedEffect } from "akasha/temper/catalog/companion/skill/properties/carried-effect.one-of-property.types.ts"
import type { ConditionalMultiplier } from "akasha/temper/catalog/companion/skill/properties/conditional-multiplier.number-property.types.ts"
import type { CooldownScope } from "akasha/temper/catalog/companion/skill/properties/cooldown-scope.text-property.types.ts"
import type { Delay } from "akasha/temper/catalog/companion/skill/properties/delay.number-property.types.ts"
import type { DisplayMode } from "akasha/temper/catalog/companion/skill/properties/display-mode.text-property.types.ts"
import type { Duration } from "akasha/temper/catalog/companion/skill/properties/duration.number-property.types.ts"
import type { DurationOffset } from "akasha/temper/catalog/companion/skill/properties/duration-offset.number-property.types.ts"
import type { EffectAmount } from "akasha/temper/catalog/companion/skill/properties/effect-amount.number-property.types.ts"
import type { EffectBuff } from "akasha/temper/catalog/companion/skill/properties/effect-buff.record-property.types.ts"
import type { EffectConditions } from "akasha/temper/catalog/companion/skill/properties/effect-conditions.record-property.types.ts"
import type { EffectCount } from "akasha/temper/catalog/companion/skill/properties/effect-count.number-property.types.ts"
import type { EffectDebuff } from "akasha/temper/catalog/companion/skill/properties/effect-debuff.record-property.types.ts"
import type { EffectFormula } from "akasha/temper/catalog/companion/skill/properties/effect-formula.record-property.types.ts"
import type { EffectStatus } from "akasha/temper/catalog/companion/skill/properties/effect-status.record-property.types.ts"
import type { EffectTarget } from "akasha/temper/catalog/companion/skill/properties/effect-target.record-property.types.ts"
import type { HdApplication } from "akasha/temper/catalog/companion/skill/properties/hd-application.text-property.types.ts"
import type { HealCount } from "akasha/temper/catalog/companion/skill/properties/heal-count.number-property.types.ts"
import type { HitCount } from "akasha/temper/catalog/companion/skill/properties/hit-count.number-property.types.ts"
import type { InitialTick } from "akasha/temper/catalog/companion/skill/properties/initial-tick.boolean-property.types.ts"
import type { Interval } from "akasha/temper/catalog/companion/skill/properties/interval.number-property.types.ts"
import type { MaxOccurrences } from "akasha/temper/catalog/companion/skill/properties/max-occurrences.number-property.types.ts"
import type { ModifierType } from "akasha/temper/catalog/companion/skill/properties/modifier-type.text-property.types.ts"
import type { Resource } from "akasha/temper/catalog/companion/skill/properties/resource.text-property.types.ts"
import type { SkillEffectType } from "akasha/temper/catalog/companion/skill/properties/skill-effect-type.text-property.types.ts"
import type { SynergyName } from "akasha/temper/catalog/companion/skill/properties/synergy-name.text-property.types.ts"
import type { TickInterval } from "akasha/temper/catalog/companion/skill/properties/tick-interval.number-property.types.ts"
import type { Trigger } from "akasha/temper/catalog/companion/skill/properties/trigger.text-property.types.ts"
import type { CompanionMetric } from "akasha/temper/catalog/companion/trait/properties/companion-metric.relation-property.types.ts"
import type { Cooldown } from "akasha/temper/catalog/gear/temper-poison-effect/properties/cooldown.number-property.types.ts"
import type { ArmorWeight } from "akasha/temper/catalog/thing/properties/armor-weight.text-property.types.ts"
import type { EffectValue } from "akasha/temper/catalog/thing/properties/effect-value.number-property.types.ts"
import type { ValuePerPiece } from "akasha/temper/catalog/thing/properties/value-per-piece.number-property.types.ts"
import type { DamageType } from "akasha/temper/player/character/skill-activation/properties/damage-type.text-property.types.ts"

export type SkillEffects = "jsonl"

export type SkillEffectsRow = {
  id: Id
  type: SkillEffectType
  amount?: EffectAmount
  armorWeight?: ArmorWeight
  augmentDelay?: AugmentDelay
  buff?: EffectBuff
  conditionalMultiplier?: ConditionalMultiplier
  conditions?: EffectConditions
  cooldown?: Cooldown
  count?: EffectCount
  damageType?: DamageType
  debuff?: EffectDebuff
  delay?: Delay
  displayMode?: DisplayMode
  duration?: Duration
  durationOffset?: DurationOffset
  effect?: CarriedEffect
  formula?: EffectFormula
  hdApplication?: HdApplication
  healCount?: HealCount
  hitCount?: HitCount
  initialTick?: InitialTick
  interval?: Interval
  maxOccurrences?: MaxOccurrences
  metricId?: CompanionMetric
  modifierType?: ModifierType
  name?: SynergyName
  resource?: Resource
  scope?: CooldownScope
  status?: EffectStatus
  target?: EffectTarget
  tickInterval?: TickInterval
  trigger?: Trigger
  value?: EffectValue
  valuePerPiece?: ValuePerPiece
}
