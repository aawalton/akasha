import type {
  TargetScope,
  TargetType,
} from "@akasha/temper-skill-kinds/skill-activation-effect-types"
import { statusEffectTypes } from "@akasha/temper-skill-kinds/status-effect-types"
import { targetScopes } from "@akasha/temper-skill-kinds/target-scopes"
import { targetTypes } from "@akasha/temper-skill-kinds/target-types"
import { capitalize } from "@akasha/utils-narrow/capitalize"

export function formatDamageType(type: string): string {
  return capitalize(type)
}

export function formatCooldown(cooldown: number): string {
  const rounded = Math.round(cooldown * 10) / 10
  return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(1)
}

export function formatTargetInfo(target: { type: TargetType; scope: TargetScope }): string {
  const scope = targetScopes.data[target.scope].name
  const type = targetTypes.data[target.type].name

  return scope === "Single" ? type : `${scope} / ${type}`
}

export function formatEnemyType(type: string): string {
  const labels: Record<string, string> = {
    undead: "Undead",
    daedra: "Daedra",
    werewolf: "Werewolf",
    "difficult-monster": "Elite Enemy",
  }
  return labels[type] ?? type
}

export function formatStatusType(status: string): string {
  if (statusEffectTypes.has(status)) {
    return statusEffectTypes.data[status].name
  }
  return status
}

export function formatWeaponType(type: string): string {
  const labels: Record<string, string> = {
    flame: "Flame",
    frost: "Frost",
    shock: "Shock",
  }
  return labels[type] ?? type
}
