import { targetArmor as targetArmorData } from "@akasha/temper-character-sources/target-armors"
import type {
  DamageType,
  EffectCondition,
} from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import type { CompanionSkillId } from "../companion-skills/companion-skills.module.code.ts"

export interface HealthSamples {
  self: number
  ally: number
  enemy: number
}

export type RotationCategory = "ultimate" | "spammable"

type RotationSkillId = CompanionSkillId | "light-attack"

export interface RotationConfig {
  cycleDuration: number
  ultimateThreshold: number
  ultimateGenerationRate: number
  includePassiveUltimate: boolean
  targetCount: number
  targetArmor: number
  damageTakenFrequency: number
  playerDamageFrequency: number
  synergyActivationRate: number
  enemyHealthStart?: number
}

export const DEFAULT_ROTATION_CONFIG: RotationConfig = {
  cycleDuration: 600,
  ultimateThreshold: 100,
  ultimateGenerationRate: 1.25,
  includePassiveUltimate: true,
  targetCount: 1,
  targetArmor: targetArmorData.data["dungeon"].armor,
  damageTakenFrequency: 0.5,
  playerDamageFrequency: 1.0,
  synergyActivationRate: 0.5,
}

export const COMPANION_GCD_DURATION = 1

export const COMPANION_LIGHT_ATTACK_GCD = 0.7

export const SIMULATION_TICK_INTERVAL = 0.1

export const ULTIMATE_GENERATION_WINDOW_DURATION = 8

export const ULTIMATE_GENERATION_RATE = 3

interface SkillUsageEvent {
  time: number
  skillId: RotationSkillId
  category: RotationCategory
  isCrit?: boolean
  lightAttackHealBuffs?: readonly LightAttackHealBuff[]
  lightAttackDamageMult?: number
}

export interface SkillUsageSummary {
  skillId: RotationSkillId
  usageCount: number
  totalDamage: number
  totalHealing: number
  averageDamage: number
  uptime: number
}

export interface DamageBreakdown {
  damageType: DamageType
  totalDamage: number
  percentage: number
}

export interface RotationResult {
  config: RotationConfig
  timeline: readonly SkillUsageEvent[]
  skillSummaries: readonly SkillUsageSummary[]
  dps: number
  directDamage: number
  dotDamage: number
  hps: number
  directHealing: number
  hotHealing: number
  selfHealing: number
  allyHealing: number
  selfHps: number
  allyHps: number
  selfShielding: number
  allyShielding: number
  selfSps: number
  allySps: number
  damageByType: readonly DamageBreakdown[]
  totalActivations: number
  actionsPerSecond: number
  ultimatesUsed: number
  singleTargetDamage: number
  aoeDamage: number
}

export interface SkillState {
  skillId: CompanionSkillId
  cooldownEndsAt: number
  effectEndsAt: number | null
  effectActiveTime: number
  usageCount: number
  category: RotationCategory
  baseCooldown: number
  castTime: number
  ultimateCost: number
  castConditions: readonly EffectCondition[]
  baseEffectDuration: number
  healType: "heals-ally" | "heals-self-only" | "no-heal"
}

export interface LightAttackHealBuff {
  skillId: CompanionSkillId
  healPerHit: number
  expiresAt: number
  maxTargets: number
  healsSelf: boolean
}

interface LightAttackDamageBuff {
  value: number
  expiresAt: number
}

interface NextAttackDamageBuff {
  value: number
  expiresAt: number
}

export interface RotationState {
  currentTime: number
  globalCooldownEndsAt: number
  castEndsAt: number
  ultimateAmount: number
  ultimateWindowExpiresAt: number
  skillStates: Map<CompanionSkillId, SkillState>
  totalActivations: number
  lightAttackCount: number
  lightAttackDamageMultSum: number
  lightAttackDirectHealing: number
  lightAttackSelfHealing: number
  lightAttackAllyHealing: number
  lightAttackHealBuffs: readonly LightAttackHealBuff[]
  lightAttackDamageBuffs: readonly LightAttackDamageBuff[]
  nextAttackDamageBuffs: readonly NextAttackDamageBuff[]
}
