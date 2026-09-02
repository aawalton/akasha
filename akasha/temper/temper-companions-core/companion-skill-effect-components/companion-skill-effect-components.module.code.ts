import type {
  CastTimeEffect,
  ChannelEffect,
  CooldownEffect,
  DamageType,
  EffectCondition,
  ResourceCostEffect,
  SpecialEffectType,
  StatusEffect,
  Targeting,
} from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import type {
  ActivationBuffEffect,
  ActivationDebuffEffect,
} from "@akasha/temper-skill-kinds/skill-buff-debuff-types"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionValueFormula } from "../companion-value-formula/companion-value-formula.module.code.ts"

export interface CompanionDamageComponent {
  type: "damage"
  damageType: DamageType
  formula?: CompanionValueFormula
  target: Targeting
  conditions?: readonly EffectCondition[]
  conditionalMultiplier?: number
}

export interface CompanionDotComponent {
  type: "dot"
  damageType: DamageType
  formula?: CompanionValueFormula
  duration: number
  tickInterval: number
  initialTick: boolean
  displayMode: "per-tick" | "total"
  durationOffset?: number
  target: Targeting
}

export interface CompanionHealComponent {
  type: "heal"
  formula?: CompanionValueFormula
  target: Targeting
  conditions?: readonly EffectCondition[]
  conditionalMultiplier?: number
}

export interface CompanionHotComponent {
  type: "hot"
  formula?: CompanionValueFormula
  duration: number
  tickInterval: number
  initialTick: boolean
  displayMode: "per-tick" | "total"
  durationOffset?: number
  hdApplication?: "per-tick" | "total"
  target: Targeting
}

export interface CompanionShieldComponent {
  type: "shield"
  formula?: CompanionValueFormula
  duration: number
  target: Targeting
}

export interface CompanionMultiHitComponent {
  type: "multi-hit"
  damageType: DamageType
  formula?: CompanionValueFormula
  hitCount: number
  target: Targeting
}

interface CompanionMultiHealComponent {
  type: "multi-heal"
  formula?: CompanionValueFormula
  healCount: number
  target: Targeting
  conditions?: readonly EffectCondition[]
  conditionalMultiplier?: number
}

export interface CompanionRetaliationComponent {
  type: "retaliation"
  damageType: DamageType
  formula?: CompanionValueFormula
  trigger: "on-damage-taken" | "on-direct-damage"
  maxOccurrences?: number
  duration?: number
  cooldown?: number
  target?: Targeting
}

interface CompanionStatusApplicationComponent {
  type: "apply-status"
  status: StatusEffect
  target: Targeting
  conditions?: readonly EffectCondition[]
}

interface CompanionBuffApplicationComponent {
  type: "apply-buff"
  buff: ActivationBuffEffect
  target: Targeting
  conditions?: readonly EffectCondition[]
  conditionalMultiplier?: number
}

interface CompanionDebuffApplicationComponent {
  type: "apply-debuff"
  debuff: ActivationDebuffEffect
  target: Targeting
  conditions?: readonly EffectCondition[]
}

interface CompanionUltimateGenerationComponent {
  type: "ultimate-generation"
  value: number
  target?: Targeting
}

interface CompanionCooldownReductionComponent {
  type: "cooldown-reduction"
  value: number | "reset"
  scope: "all" | "other"
}

interface CompanionSpecialComponent {
  type: "special"
  effect: SpecialEffectType
  duration?: number
  count?: number
}

export type CompanionSkillEffectComponent =
  | CompanionDamageComponent
  | CompanionDotComponent
  | CompanionHealComponent
  | CompanionHotComponent
  | CompanionShieldComponent
  | CompanionMultiHitComponent
  | CompanionMultiHealComponent
  | CompanionRetaliationComponent
  | CompanionStatusApplicationComponent
  | CompanionBuffApplicationComponent
  | CompanionDebuffApplicationComponent
  | CompanionUltimateGenerationComponent
  | CompanionCooldownReductionComponent
  | CompanionSpecialComponent
  | CompanionDelayedEffectComponent
  | CompanionSynergyComponent
  | CompanionPeriodicTriggerComponent
  | CompanionPlayerTriggerComponent
  | CompanionLightAttackHealComponent

export interface CompanionDelayedEffectComponent {
  type: "delayed"
  delay: number
  augmentDelay?: boolean
  effect: CompanionSkillEffectComponent
}

export interface CompanionSynergyComponent {
  type: "synergy"
  name: string
  effect: CompanionSkillEffectComponent
}

export interface CompanionPeriodicTriggerComponent {
  type: "periodic-trigger"
  effect: CompanionSkillEffectComponent
  interval: number
  duration: number
  trigger?: "on-damage-taken" | "on-light-attack"
}

export interface CompanionPlayerTriggerComponent {
  type: "player-trigger"
  damageType: DamageType
  formula?: CompanionValueFormula
  duration: number
  target: Targeting
}

interface CompanionLightAttackHealComponent {
  type: "light-attack-heal"
  formula: CompanionValueFormula
  duration: number
  target: Targeting
}

interface CompanionPassiveStatEffect {
  type: "passive"
  metricId: CompanionMetricId
  modifierType: "integer" | "fractional-change"
  value: number
}

interface CompanionArmorPieceScalingEffect {
  type: "armor-piece-scaling"
  metricId: CompanionMetricId
  armorWeight: "light" | "medium" | "heavy"
  valuePerPiece: number
}

export type CompanionEffect =
  | CompanionSkillEffectComponent
  | ResourceCostEffect
  | CompanionPassiveStatEffect
  | CompanionArmorPieceScalingEffect
  | CooldownEffect
  | CastTimeEffect
  | ChannelEffect

export function isCompanionPassiveStatEffect(
  effect: CompanionEffect
): effect is CompanionPassiveStatEffect {
  return effect.type === "passive"
}

export function isResourceCostEffect(effect: CompanionEffect): effect is ResourceCostEffect {
  return effect.type === "resource-cost"
}
