import type {
  DamageType,
  EffectCondition,
  TargetType,
} from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { CompanionSkillTemplate } from "../companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"
import type {
  CompanionEffect,
  CompanionSkillEffectComponent,
} from "../companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import {
  type CompanionScalingMetricId,
  type CompanionValueFormula,
  getFormulaCoefficientType,
} from "../companion-value-formula/companion-value-formula.module.code.ts"
import { companionBase } from "../companions-base-source/companions-base-source.module.code.ts"

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
  coefficient?: number
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

function getDefaultCompanionStatValue(metricId: CompanionScalingMetricId): number {
  const baseStats = companionBase.data["companion-base-stats"]
  for (const effect of baseStats.effects) {
    if (effect.metricId === metricId && effect.effectType === "integer") {
      return effect.effectValue
    }
  }
  return metricId === "companion-weapon-damage" ? 2000 : 30000
}

function calculateBaseValueFromFormula(
  formula: CompanionValueFormula | undefined,
  tickCount?: number,
  config: Required<EffectExtractionConfig> = DEFAULT_EXTRACTION_CONFIG
): number {
  if (!formula) return 0

  let rawValue: number
  switch (formula.type) {
    case "metric-scaling": {
      const metricValue = getDefaultCompanionStatValue(formula.metricId)
      rawValue = formula.coefficient * metricValue
      break
    }
    case "metric-percent": {
      const metricValue = getDefaultCompanionStatValue(formula.metricId)
      rawValue = (formula.percent / 100) * metricValue
      break
    }
    case "player-health-percent":
      rawValue = (formula.percent / 100) * config.playerMaxHealth
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

function getFormulaCoefficient(
  formula: CompanionValueFormula | undefined,
  tickCount?: number
): number | undefined {
  if (formula?.type !== "metric-scaling") return undefined

  const coefficient = formula.coefficient

  if (tickCount != null && getFormulaCoefficientType(formula) === "per-tick") {
    return coefficient * tickCount
  }

  return coefficient
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
  config: Required<EffectExtractionConfig>
}

function extractSingleEffect(
  effect: CompanionSkillEffectComponent,
  state: ExtractionState
): readonly ExtractedFormulaComponent[] {
  const components: ExtractedFormulaComponent[] = []
  const { config } = state

  if (effect.type === "damage") {
    const coefficient = getFormulaCoefficient(effect.formula)
    const baseValue = calculateBaseValueFromFormula(effect.formula, undefined, config)

    components.push({
      id: `damage-${state.componentIndex++}`,
      category: "direct-damage",
      baseValue,
      coefficient,
      damageType: effect.damageType,
      isAoe: effect.target.scope !== "single",
      maxTargets: effect.target.maxTargets,
      conditions: effect.conditions,
      conditionalMultiplier: effect.conditionalMultiplier,
    })
  } else if (effect.type === "dot") {
    const tickInterval = effect.tickInterval ?? 2
    const tickCount = Math.floor(effect.duration / tickInterval) + (effect.initialTick ? 1 : 0)
    const coefficient = getFormulaCoefficient(effect.formula, tickCount)
    const baseValue = calculateBaseValueFromFormula(effect.formula, tickCount, config)

    components.push({
      id: `dot-${state.componentIndex++}`,
      category: "dot-damage",
      baseValue,
      coefficient,
      damageType: effect.damageType,
      duration: effect.duration,
      tickInterval,
      isAoe: effect.target.scope !== "single",
      maxTargets: effect.target.maxTargets,
    })
  } else if (effect.type === "heal") {
    const coefficient = getFormulaCoefficient(effect.formula)
    const baseValue = calculateBaseValueFromFormula(effect.formula, undefined, config)

    components.push({
      id: `heal-${state.componentIndex++}`,
      category: "direct-heal",
      baseValue,
      coefficient,
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
    const coefficient = getFormulaCoefficient(effect.formula, tickCount)
    const baseValue = calculateBaseValueFromFormula(effect.formula, tickCount, config)

    components.push({
      id: `hot-${state.componentIndex++}`,
      category: "hot-heal",
      baseValue,
      coefficient,
      damageType: null,
      duration: effect.duration,
      tickInterval,
      isAoe: effect.target.scope !== "single",
      maxTargets: effect.target.maxTargets,
      targetType: effect.target.type,
    })
  } else if (effect.type === "shield") {
    const coefficient = getFormulaCoefficient(effect.formula)
    const baseValue = calculateBaseValueFromFormula(effect.formula, undefined, config)

    components.push({
      id: `shield-${state.componentIndex++}`,
      category: "shield",
      baseValue,
      coefficient,
      damageType: null,
      duration: effect.duration,
      isAoe: effect.target.scope !== "single",
      maxTargets: effect.target.maxTargets,
      targetType: effect.target.type,
    })
  } else if (effect.type === "multi-hit") {
    const coefficient = getFormulaCoefficient(effect.formula)
    const baseValue = calculateBaseValueFromFormula(effect.formula, undefined, config)

    for (let i = 0; i < effect.hitCount; i++) {
      components.push({
        id: `hit-${state.componentIndex++}`,
        category: "direct-damage",
        baseValue,
        coefficient,
        damageType: effect.damageType,
        isAoe: effect.target.scope !== "single",
        maxTargets: effect.target.maxTargets,
      })
    }
  } else if (effect.type === "multi-heal") {
    const coefficient = getFormulaCoefficient(effect.formula)
    const baseValue = calculateBaseValueFromFormula(effect.formula, undefined, config)

    for (let i = 0; i < effect.healCount; i++) {
      components.push({
        id: `heal-${state.componentIndex++}`,
        category: "direct-heal",
        baseValue,
        coefficient,
        damageType: null,
        isAoe: effect.target.scope !== "single",
        maxTargets: effect.target.maxTargets,
        targetType: effect.target.type,
        conditions: effect.conditions,
        conditionalMultiplier: effect.conditionalMultiplier,
      })
    }
  } else if (effect.type === "retaliation") {
    const coefficient = getFormulaCoefficient(effect.formula)
    const baseValue = calculateBaseValueFromFormula(effect.formula, undefined, config)

    const duration = effect.duration ?? 0
    const maxOccurrences = effect.maxOccurrences ?? 1
    const expectedTriggers = Math.min(maxOccurrences, duration * config.damageTakenFrequency)

    if (expectedTriggers > 0) {
      components.push({
        id: `retaliation-${state.componentIndex++}`,
        category: "direct-damage",
        baseValue: baseValue * expectedTriggers,
        coefficient: coefficient != null ? coefficient * expectedTriggers : undefined,
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
    const coefficient = getFormulaCoefficient(effect.formula)
    const baseValue = calculateBaseValueFromFormula(effect.formula, undefined, config)

    const expectedTriggers = 1

    components.push({
      id: `player-trigger-${state.componentIndex++}`,
      category: "direct-damage",
      baseValue: baseValue * expectedTriggers,
      coefficient: coefficient != null ? coefficient * expectedTriggers : undefined,
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
        if (component.coefficient != null) {
          component.coefficient *= triggerCount
        }
        component.expectedTriggerCount = triggerCount
        components.push(component)
      }
    }
  } else if (effect.type === "synergy") {
    const nestedComponents = extractSingleEffect(effect.effect, state)
    for (const component of nestedComponents) {
      component.triggerType = "synergy"
      component.baseValue *= config.synergyActivationRate
      if (component.coefficient != null) {
        component.coefficient *= config.synergyActivationRate
      }
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
  config?: EffectExtractionConfig
): readonly ExtractedFormulaComponent[] {
  const components: ExtractedFormulaComponent[] = []
  const state: ExtractionState = {
    componentIndex: 0,
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
