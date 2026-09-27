import {
  companionCatalog,
  companionNameAt,
  companionNameIn,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { TargetScope } from "akasha/temper/catalog/effect/temper-target-scope/modules/target-scope-ids/target-scope-ids.data-table.code.ts"
import type { TargetType } from "akasha/temper/catalog/effect/temper-target-type/modules/target-type-ids/target-type-ids.data-table.code.ts"
import { capitalize } from "akasha/text/writing/modules/capitalize/capitalize.module.code.ts"

export function formatDamageType(type: string): string {
  return capitalize(type)
}

export function formatCooldown(cooldown: number): string {
  const rounded = Math.round(cooldown * 10) / 10
  return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(1)
}

export function targetScopeName(scope: TargetScope): string {
  return companionNameAt(companionCatalog().targetScopes, scope, "target scope")
}

export function targetTypeName(type: TargetType): string {
  return companionNameAt(companionCatalog().targetTypes, type, "target type")
}

export function formatTargetInfo(target: { type: TargetType; scope: TargetScope }): string {
  const scope = targetScopeName(target.scope)
  const type = targetTypeName(target.type)

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
  return companionNameIn(companionCatalog().statusEffectTypes, status) ?? status
}

export function formatWeaponType(type: string): string {
  const labels: Record<string, string> = {
    flame: "Flame",
    frost: "Frost",
    shock: "Shock",
  }
  return labels[type] ?? type
}
