import { assertNever } from "@akasha/utils-narrow/assert-never"
import type {
  CompanionEffect,
  CompanionSkillEffectComponent,
} from "../companion-skill-effect-components/companion-skill-effect-components.module.code.ts"

function getAugmentableDuration(effect: CompanionEffect): number | undefined {
  switch (effect.type) {
    case "dot":
    case "hot":
    case "shield":
    case "light-attack-heal":
    case "periodic-trigger":
    case "player-trigger":
      return effect.duration
    case "retaliation":
    case "special":
      return effect.duration
    case "apply-status":
      return effect.status.duration
    case "apply-buff":
      return effect.buff.duration
    case "apply-debuff":
      return effect.debuff.duration
    case "passive":
    case "damage":
    case "heal":
    case "multi-hit":
    case "multi-heal":
    case "ultimate-generation":
    case "cooldown-reduction":
    case "delayed":
    case "synergy":
    case "resource-cost":
    case "armor-piece-scaling":
    case "cooldown":
    case "cast-time":
    case "channel":
      return undefined
    default:
      assertNever(effect)
  }
}

function augmentDuration(baseDuration: number, buffDuration: number): number {
  return baseDuration * (1 + buffDuration)
}

function getDurationOffset(effect: CompanionEffect | CompanionSkillEffectComponent): number {
  if (effect.type === "dot" || effect.type === "hot") {
    return effect.durationOffset ?? 0
  }
  return 0
}

function augmentDecomposedDuration(
  baseDuration: number,
  offset: number,
  buffDuration: number
): number {
  const childDuration = baseDuration - offset
  const augmentedChild = childDuration * (1 + buffDuration)
  const truncatedChild = Math.round(augmentedChild * 10) / 10
  return truncatedChild + offset
}

interface AugmentedDuration {
  value: number
  truncate: boolean
}

export function computeAugmentedDurations(
  effects: readonly CompanionEffect[],
  buffDuration: number,
  abilityCooldown?: number
): Map<number, AugmentedDuration> {
  const durations = new Map<number, AugmentedDuration>()
  let slot = 1
  for (const effect of effects) {
    const startSlot = slot
    const baseDuration = getAugmentableDuration(effect)
    if (baseDuration !== undefined) {
      const offset = getDurationOffset(effect)
      durations.set(slot++, {
        value:
          offset > 0
            ? augmentDecomposedDuration(baseDuration, offset, buffDuration)
            : augmentDuration(baseDuration, buffDuration),
        truncate: false,
      })
    }
    if (effect.type === "retaliation" && effect.cooldown !== undefined) {
      durations.set(slot++, {
        value: effect.cooldown * (1 + (abilityCooldown ?? 0)),
        truncate: false,
      })
    }
    if (effect.type === "delayed") {
      if (effect.augmentDelay) {
        durations.set(slot++, {
          value: effect.delay * (1 + buffDuration),
          truncate: false,
        })
      }
      const nestedDuration = getAugmentableDuration(effect.effect)
      if (nestedDuration !== undefined) {
        const nestedOffset = getDurationOffset(effect.effect)
        durations.set(slot++, {
          value:
            nestedOffset > 0
              ? augmentDecomposedDuration(nestedDuration, nestedOffset, buffDuration)
              : augmentDuration(nestedDuration, buffDuration),
          truncate: false,
        })
      }
    }
    if (effect.type === "synergy") {
      const nestedDuration = getAugmentableDuration(effect.effect)
      if (nestedDuration !== undefined) {
        const nestedOffset = getDurationOffset(effect.effect)
        durations.set(slot++, {
          value:
            nestedOffset > 0
              ? augmentDecomposedDuration(nestedDuration, nestedOffset, buffDuration)
              : augmentDuration(nestedDuration, buffDuration),
          truncate: false,
        })
      }
    }
    slot = Math.max(slot, startSlot + 1)
  }
  return durations
}

export function formatDuration(value: number, truncate?: boolean): string {
  if (Number.isInteger(value)) return String(value)
  if (truncate) {
    const truncated = Math.floor(value * 10) / 10
    return Number.isInteger(truncated) ? String(truncated) : truncated.toFixed(1)
  }
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
}

export function substituteDescriptionPlaceholders(
  description: string,
  durations: Map<number, string>,
  values: readonly (string | undefined)[]
): string {
  let result = description

  for (const [slot, duration] of durations) {
    result = result.replaceAll(`$$${slot}`, duration)
  }

  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    if (value !== undefined) {
      result = result.replaceAll(`$${i + 1}`, value)
    }
  }

  return result
}
