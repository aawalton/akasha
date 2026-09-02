import { calculatePeriodicTooltipValue } from "../companion-periodic-formula/companion-periodic-formula.module.code.ts"
import type {
  CompanionEffect,
  CompanionSkillEffectComponent,
} from "../companion-skill-effect-components/companion-skill-effect-components.module.code.ts"
import type { CompanionFormulaStats } from "../companion-skill-formula/companion-skill-formula.module.code.ts"
import { evaluateSkillFormula } from "../companion-skill-formula/companion-skill-formula.module.code.ts"
import type { CompanionValueFormula } from "../companion-value-formula/companion-value-formula.module.code.ts"

const VALUE_PRODUCING_TYPES = new Set([
  "damage",
  "dot",
  "heal",
  "hot",
  "shield",
  "multi-hit",
  "multi-heal",
  "retaliation",
  "delayed",
  "synergy",
  "periodic-trigger",
  "player-trigger",
  "light-attack-heal",
])

function isValueProducingEffect(effect: CompanionEffect): effect is CompanionSkillEffectComponent {
  return VALUE_PRODUCING_TYPES.has(effect.type)
}

function getEffectFormula(effect: CompanionSkillEffectComponent):
  | {
      formula: CompanionValueFormula
      effectType: "damage" | "heal" | undefined
      effect: CompanionSkillEffectComponent
    }
  | undefined {
  if (effect.type === "delayed") {
    return getEffectFormula(effect.effect)
  }
  if (effect.type === "synergy") {
    return getEffectFormula(effect.effect)
  }
  if (effect.type === "periodic-trigger") {
    return getEffectFormula(effect.effect)
  }

  if (effect.type === "light-attack-heal") {
    return {
      formula: effect.formula,
      effectType: "heal",
      effect,
    }
  }

  const effectType = getEffectTypeForFormula(effect.type)

  if ("formula" in effect && effect.formula) {
    return { formula: effect.formula, effectType, effect }
  }
  return undefined
}

function getEffectTypeForFormula(type: string): "damage" | "heal" | undefined {
  switch (type) {
    case "damage":
    case "dot":
    case "multi-hit":
    case "retaliation":
    case "player-trigger":
      return "damage"
    case "heal":
    case "hot":
    case "multi-heal":
      return "heal"
    case "shield":
      return undefined
    default:
      return undefined
  }
}

export function computeSkillDescriptionValues(
  effects: readonly CompanionEffect[],
  stats: CompanionFormulaStats
): readonly number[] {
  const values: number[] = []

  const isChanneled = effects.some((e) => e.type === "channel")

  for (const effect of effects) {
    if (!isValueProducingEffect(effect)) continue

    const formulaInfo = getEffectFormula(effect)
    if (formulaInfo == null) continue

    const skillEffect = formulaInfo.effect
    let computed: number

    if (
      (skillEffect.type === "dot" || skillEffect.type === "hot") &&
      formulaInfo.effectType != null
    ) {
      computed = calculatePeriodicTooltipValue(
        formulaInfo.formula,
        stats,
        formulaInfo.effectType,
        skillEffect.duration,
        skillEffect.tickInterval,
        skillEffect.initialTick,
        skillEffect.displayMode,
        isChanneled,
        skillEffect.type === "hot" ? skillEffect.hdApplication : undefined
      )
    } else {
      computed = evaluateSkillFormula(formulaInfo.formula, stats, formulaInfo.effectType)
    }

    values.push(Math.round(computed))
  }

  return values
}
