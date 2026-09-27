import {
  companionCatalog,
  companionNameAt,
  companionNameIn,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { TargetScope } from "akasha/temper/catalog/effect/temper-target-scope/modules/target-scope-ids/target-scope-ids.data-table.code.ts"
import type { TargetType } from "akasha/temper/catalog/effect/temper-target-type/modules/target-type-ids/target-type-ids.data-table.code.ts"

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

export function formatStatusType(status: string): string {
  return companionNameIn(companionCatalog().statusEffectTypes, status) ?? status
}
