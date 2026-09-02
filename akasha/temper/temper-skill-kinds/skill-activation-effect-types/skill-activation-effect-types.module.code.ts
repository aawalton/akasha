import type {
  ActivationBuffEffect,
  ActivationDebuffEffect,
} from "../skill-buff-debuff-types/skill-buff-debuff-types.module.code.ts"
import type { SkillValueFormula } from "../skill-value-formulas/skill-value-formulas.module.code.ts"

export type DamageType =
  | "physical"
  | "magic"
  | "flame"
  | "frost"
  | "shock"
  | "poison"
  | "disease"
  | "bleed"
  | "oblivion"

export type TargetType =
  | "self"
  | "enemy"
  | "ally"
  | "self-and-ally"
  | "self-or-ally"
  | "lowest-health-ally"
  | "ground"

export type TargetScope = "single" | "cone" | "area" | "line"

export interface Targeting {
  type: TargetType
  scope: TargetScope
  maxTargets?: number
  radius?: number
  range?: number
}

interface EnemyTypeCondition {
  type: "enemy-type"
  enemyTypes: readonly ("undead" | "daedra" | "werewolf" | "difficult-monster")[]
}

interface HealthThresholdCondition {
  type: "health-threshold"
  targetType?: "self" | "ally" | "enemy"
  below?: number
  above?: number
}

interface RangeCondition {
  type: "range"
  minDistance?: number
  maxDistance?: number
}

interface StatusCondition {
  type: "status"
  hasStatus?: StatusEffectType
  notStatus?: StatusEffectType
}

interface CastingCondition {
  type: "casting"
  isCasting: boolean
}

interface MovableCondition {
  type: "movable"
  isMovable: boolean
}

interface WeaponTypeCondition {
  type: "weapon-type"
  weaponType: "flame" | "frost" | "shock"
}

interface NearbyCondition {
  type: "nearby"
  targetType: "enemy" | "ally"
  maxDistance?: number
}

interface AllyHealthCondition {
  type: "ally-health"
  below?: number
  above?: number
}

export type BaseEffectCondition =
  | EnemyTypeCondition
  | HealthThresholdCondition
  | RangeCondition
  | StatusCondition
  | CastingCondition
  | MovableCondition
  | WeaponTypeCondition
  | NearbyCondition
  | AllyHealthCondition

export interface CompoundCondition {
  type: "any" | "all"
  conditions: readonly EffectCondition[]
}

export type EffectCondition = BaseEffectCondition | CompoundCondition

export type StatusEffectType =
  | "stun"
  | "fear"
  | "immobilize"
  | "knockback"
  | "knockup"
  | "off-balance"
  | "snare"
  | "burning"
  | "chilled"
  | "concussed"
  | "taunt"
  | "invisible"

export interface StatusEffect {
  status: StatusEffectType
  duration: number
  distance?: number
  magnitude?: number
}

interface DamageComponent {
  type: "damage"
  damageType: DamageType
  formula?: SkillValueFormula
  target: Targeting
  conditions?: readonly EffectCondition[]
  conditionalMultiplier?: number
}

interface DotComponent {
  type: "dot"
  damageType: DamageType
  formula?: SkillValueFormula
  duration: number
  tickInterval?: number
  target: Targeting
}

interface HealComponent {
  type: "heal"
  formula?: SkillValueFormula
  target: Targeting
  conditions?: readonly EffectCondition[]
  conditionalMultiplier?: number
}

interface HotComponent {
  type: "hot"
  formula?: SkillValueFormula
  duration: number
  tickInterval?: number
  target: Targeting
}

interface ShieldComponent {
  type: "shield"
  formula?: SkillValueFormula
  duration: number
  target: Targeting
}

interface MultiHitComponent {
  type: "multi-hit"
  damageType: DamageType
  formula?: SkillValueFormula
  hitCount: number
  target: Targeting
}

interface StatusApplicationComponent {
  type: "apply-status"
  status: StatusEffect
  target: Targeting
  conditions?: readonly EffectCondition[]
}

interface BuffApplicationComponent {
  type: "apply-buff"
  buff: ActivationBuffEffect
  target: Targeting
}

interface DebuffApplicationComponent {
  type: "apply-debuff"
  debuff: ActivationDebuffEffect
  target: Targeting
  conditions?: readonly EffectCondition[]
}

interface UltimateGenerationComponent {
  type: "ultimate-generation"
  value: number
  target?: Targeting
}

interface CooldownReductionComponent {
  type: "cooldown-reduction"
  value: number | "reset"
  scope: "all" | "other"
}

interface RetaliationComponent {
  type: "retaliation"
  damageType: DamageType
  formula?: SkillValueFormula
  trigger: "on-damage-taken" | "on-direct-damage"
  maxOccurrences?: number
  duration?: number
  target?: Targeting
}

interface PeriodicTriggerComponent {
  type: "periodic-trigger"
  effect: SkillEffectComponent
  interval: number
  duration: number
  trigger?: "on-damage-taken" | "on-light-attack"
}

interface DelayedEffectComponent {
  type: "delayed"
  delay: number
  effect: SkillEffectComponent
}

interface SynergyComponent {
  type: "synergy"
  name: string
  effect: SkillEffectComponent
}

export type SpecialEffectType =
  | "block-all"
  | "reflect-all"
  | "heal-to-full"
  | "become-invisible"
  | "dodge-next-attack"
  | "interrupt"
  | "ignore-resistance"
  | "pull-to-caster"
  | "create-corpse"
  | "cleanse"

interface SpecialComponent {
  type: "special"
  effect: SpecialEffectType
  duration?: number
  count?: number
}

export interface CooldownEffect {
  type: "cooldown"
  duration: number
}

export interface CastTimeEffect {
  type: "cast-time"
  duration: number
}

export interface ChannelEffect {
  type: "channel"
  duration: number
}

type SkillEffectComponent =
  | DamageComponent
  | DotComponent
  | HealComponent
  | HotComponent
  | ShieldComponent
  | MultiHitComponent
  | StatusApplicationComponent
  | BuffApplicationComponent
  | DebuffApplicationComponent
  | UltimateGenerationComponent
  | CooldownReductionComponent
  | RetaliationComponent
  | PeriodicTriggerComponent
  | DelayedEffectComponent
  | SynergyComponent
  | SpecialComponent
  | CooldownEffect
  | CastTimeEffect
  | ChannelEffect

export interface ResourceCostEffect {
  type: "resource-cost"
  resource: "magicka" | "stamina" | "ultimate" | "health"
  amount: number
}
