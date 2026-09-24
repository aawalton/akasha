import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import type { CompanionSkillTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import type {
  CompanionEffect,
  CompanionSkillEffectComponent,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import {
  type CompanionScalingStats,
  type CompanionValueFormula,
  getFormulaCoefficientType,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-value-formula/companion-value-formula.module.code.ts"
import type {
  DamageType,
  EffectCondition,
  TargetType,
} from "akasha/temper/catalog/skill-kind/modules/skill-activation-effect-types/skill-activation-effect-types.module.code.ts"

type EffectTriggerType =
  | "retaliation"
  | "delayed"
  | "player-trigger"
  | "periodic-trigger"
  | "synergy"

interface ExtractedFormulaComponent {
  id: string
  category: "direct-damage" | "dot-damage" | "direct-heal" | "hot-heal" | "shield"
  baseValue: number
  damageType: DamageType | null
  duration?: number
  tickInterval?: number
  isAoe?: boolean
  maxTargets?: number
  targetType?: TargetType
  triggerType?: EffectTriggerType
  expectedTriggerCount?: number
  conditions?: readonly EffectCondition[]
  conditionalMultiplier?: number
}

function calculateBaseValueFromFormula(
  formula: CompanionValueFormula | undefined,
  state: ExtractionState,
  tickCount?: number
): number {
  if (!formula) return 0

  let rawValue: number
  switch (formula.type) {
    case "metric-scaling":
      rawValue = formula.coefficient * state.stats[formula.metricId]
      break
    case "metric-percent":
      rawValue = (formula.percent / 100) * state.stats[formula.metricId]
      break
    case "player-health-percent":
      rawValue = (formula.percent / 100) * state.config.playerMaxHealth
      break
    case "fixed":
      rawValue = formula.value
      break
    default:
      assertNever(formula)
  }

  if (tickCount != null && getFormulaCoefficientType(formula) === "per-tick") {
    return rawValue * tickCount
  }

  return rawValue
}

interface EffectExtractionConfig {
  damageTakenFrequency?: number
  playerDamageFrequency?: number
  synergyActivationRate?: number
  playerMaxHealth?: number
}

const DEFAULT_EXTRACTION_CONFIG: Required<EffectExtractionConfig> = {
  damageTakenFrequency: 0.5,
  playerDamageFrequency: 1.0,
  synergyActivationRate: 0.5,
  playerMaxHealth: 25000,
}

interface ExtractionState {
  componentIndex: number
  stats: CompanionScalingStats
  config: Required<EffectExtractionConfig>
}

function extractSingleEffect(
  effect: CompanionSkillEffectComponent,
  state: ExtractionState
): readonly ExtractedFormulaComponent[] {
  const components: ExtractedFormulaComponent[] = []
  const { config } = state

  if (effect.type === "damage") {
    const baseValue = calculateBaseValueFromFormula(effect.formula, state)

    components.push({
      id: `damage-${state.componentIndex++}`,
      category: "direct-damage",
      baseValue,
      damageType: effect.damageType,
      isAoe: effect.target.scope !== "single",
      maxTargets: effect.target.maxTargets,
      conditions: effect.conditions,
      conditionalMultiplier: effect.conditionalMultiplier,
    })
  } else if (effect.type === "dot") {
    const tickInterval = effect.tickInterval ?? 2
    const tickCount = Math.floor(effect.duration / tickInterval) + (effect.initialTick ? 1 : 0)
    const baseValue = calculateBaseValueFromFormula(effect.formula, state, tickCount)

    components.push({
      id: `dot-${state.componentIndex++}`,
      category: "dot-damage",
      baseValue,
      damageType: effect.damageType,
      duration: effect.duration,
      tickInterval,
      isAoe: effect.target.scope !== "single",
      maxTargets: effect.target.maxTargets,
    })
  } else if (effect.type === "heal") {
    const baseValue = calculateBaseValueFromFormula(effect.formula, state)

    components.push({
      id: `heal-${state.componentIndex++}`,
      category: "direct-heal",
      baseValue,
      damageType: null,
      isAoe: effect.target.scope !== "single",
      maxTargets: effect.target.maxTargets,
      targetType: effect.target.type,
      conditions: effect.conditions,
      conditionalMultiplier: effect.conditionalMultiplier,
    })
  } else if (effect.type === "hot") {
    const tickInterval = effect.tickInterval ?? 2
    const tickCount = Math.floor(effect.duration / tickInterval) + (effect.initialTick ? 1 : 0)
    const baseValue = calculateBaseValueFromFormula(effect.formula, state, tickCount)

    components.push({
      id: `hot-${state.componentIndex++}`,
      category: "hot-heal",
      baseValue,
      damageType: null,
      duration: effect.duration,
      tickInterval,
      isAoe: effect.target.scope !== "single",
      maxTargets: effect.target.maxTargets,
      targetType: effect.target.type,
    })
  } else if (effect.type === "shield") {
    const baseValue = calculateBaseValueFromFormula(effect.formula, state)

    components.push({
      id: `shield-${state.componentIndex++}`,
      category: "shield",
      baseValue,
      damageType: null,
      duration: effect.duration,
      isAoe: effect.target.scope !== "single",
      maxTargets: effect.target.maxTargets,
      targetType: effect.target.type,
    })
  } else if (effect.type === "multi-hit") {
    const baseValue = calculateBaseValueFromFormula(effect.formula, state)

    for (let i = 0; i < effect.hitCount; i++) {
      components.push({
        id: `hit-${state.componentIndex++}`,
        category: "direct-damage",
        baseValue,
        damageType: effect.damageType,
        isAoe: effect.target.scope !== "single",
        maxTargets: effect.target.maxTargets,
      })
    }
  } else if (effect.type === "multi-heal") {
    const baseValue = calculateBaseValueFromFormula(effect.formula, state)

    for (let i = 0; i < effect.healCount; i++) {
      components.push({
        id: `heal-${state.componentIndex++}`,
        category: "direct-heal",
        baseValue,
        damageType: null,
        isAoe: effect.target.scope !== "single",
        maxTargets: effect.target.maxTargets,
        targetType: effect.target.type,
        conditions: effect.conditions,
        conditionalMultiplier: effect.conditionalMultiplier,
      })
    }
  } else if (effect.type === "retaliation") {
    const baseValue = calculateBaseValueFromFormula(effect.formula, state)

    const duration = effect.duration ?? 0
    const maxOccurrences = effect.maxOccurrences ?? 1
    const expectedTriggers = Math.min(maxOccurrences, duration * config.damageTakenFrequency)

    if (expectedTriggers > 0) {
      components.push({
        id: `retaliation-${state.componentIndex++}`,
        category: "direct-damage",
        baseValue: baseValue * expectedTriggers,
        damageType: effect.damageType,
        isAoe: effect.target?.scope !== "single",
        maxTargets: effect.target?.maxTargets,
        triggerType: "retaliation",
        expectedTriggerCount: expectedTriggers,
      })
    }
  } else if (effect.type === "delayed") {
    const nestedComponents = extractSingleEffect(effect.effect, state)
    for (const component of nestedComponents) {
      component.triggerType = "delayed"
      if ("conditions" in effect.effect && effect.effect.conditions) {
        component.conditions = effect.effect.conditions
      }
      components.push(component)
    }
  } else if (effect.type === "player-trigger") {
    const baseValue = calculateBaseValueFromFormula(effect.formula, state)

    const expectedTriggers = 1

    components.push({
      id: `player-trigger-${state.componentIndex++}`,
      category: "direct-damage",
      baseValue: baseValue * expectedTriggers,
      damageType: effect.damageType,
      isAoe: effect.target.scope !== "single",
      maxTargets: effect.target.maxTargets,
      triggerType: "player-trigger",
      expectedTriggerCount: expectedTriggers,
    })
  } else if (effect.type === "periodic-trigger") {
    const triggerCount = Math.floor(effect.duration / effect.interval)

    if (triggerCount > 0) {
      const nestedComponents = extractSingleEffect(effect.effect, state)
      for (const component of nestedComponents) {
        component.triggerType = "periodic-trigger"
        component.baseValue *= triggerCount
        component.expectedTriggerCount = triggerCount
        components.push(component)
      }
    }
  } else if (effect.type === "synergy") {
    const nestedComponents = extractSingleEffect(effect.effect, state)
    for (const component of nestedComponents) {
      component.triggerType = "synergy"
      component.baseValue *= config.synergyActivationRate
      component.expectedTriggerCount = config.synergyActivationRate
      components.push(component)
    }
  }

  return components
}

function isSkillEffectComponent(effect: CompanionEffect): effect is CompanionSkillEffectComponent {
  return (
    effect.type !== "cooldown" &&
    effect.type !== "cast-time" &&
    effect.type !== "channel" &&
    effect.type !== "resource-cost" &&
    effect.type !== "passive" &&
    effect.type !== "armor-piece-scaling"
  )
}

export function extractFormulaComponents(
  template: CompanionSkillTemplate,
  stats: CompanionScalingStats,
  config?: EffectExtractionConfig
): readonly ExtractedFormulaComponent[] {
  const components: ExtractedFormulaComponent[] = []
  const state: ExtractionState = {
    componentIndex: 0,
    stats,
    config: { ...DEFAULT_EXTRACTION_CONFIG, ...config },
  }

  for (const effect of template.effects) {
    if (isSkillEffectComponent(effect)) {
      const extracted = extractSingleEffect(effect, state)
      components.push(...extracted)
    }
  }

  return components
}
