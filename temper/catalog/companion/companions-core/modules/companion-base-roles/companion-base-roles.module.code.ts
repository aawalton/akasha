import {
  type CompanionArmorWeight,
  companionArmorWeights,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-weights/companion-armor-weights.module.code.ts"
import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionTraitId } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import type { CompanionWeaponRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-roles/companion-weapon-roles.module.code.ts"
import type { RotationBreakdownRowId } from "akasha/temper/catalog/companion/companions-core/modules/rotation-breakdown-rows/rotation-breakdown-rows.module.code.ts"

export type CompanionBaseRoleId = "dps" | "tank" | "healer" | "support"

export function isCompanionBaseRoleId(value: unknown): value is CompanionBaseRoleId {
  return value === "dps" || value === "tank" || value === "healer" || value === "support"
}

export interface CompanionBaseRoleTemplate {
  readonly id: CompanionBaseRoleId
  readonly name: string
  readonly abbreviation: string
  readonly description: string
  readonly validWeaponRoleIds: readonly CompanionWeaponRoleId[]
  readonly validTraitIds: readonly CompanionTraitId[]
  readonly validArmorWeights: readonly CompanionArmorWeight[]
  readonly totalMetricId: CompanionMetricId | null
  readonly primaryBreakdownRowId: RotationBreakdownRowId | null
  readonly defaultTraitId: string | null
  readonly defaultMainHand: string | null
  readonly defaultOffHand: string | null
  readonly defaultWeaponRoleIds: readonly CompanionWeaponRoleId[]
}

export function companionBaseRoles(): readonly CompanionBaseRoleTemplate[] {
  return companionCatalog().baseRoles
}

export function companionBaseRoleIds(): readonly CompanionBaseRoleId[] {
  return companionBaseRoles().map((role) => role.id)
}

export function companionBaseRoleAt(id: CompanionBaseRoleId): CompanionBaseRoleTemplate {
  const role = companionBaseRoles().find((one) => one.id === id)
  if (role === undefined) throw new Error(`no companion base role page answers to \`${id}\``)
  return role
}

export function primaryBreakdownRowsOf(
  roles: readonly CompanionBaseRoleId[]
): readonly RotationBreakdownRowId[] {
  return companionBaseRoles().flatMap((role) =>
    roles.includes(role.id) && role.primaryBreakdownRowId !== null
      ? [role.primaryBreakdownRowId]
      : []
  )
}

export function getValidTraitIdsForBaseRoles(
  roles: readonly CompanionBaseRoleId[]
): readonly CompanionTraitId[] {
  const set = new Set<CompanionTraitId>()
  for (const roleId of roles) {
    for (const id of companionBaseRoleAt(roleId).validTraitIds) {
      set.add(id)
    }
  }
  return [...set]
}

export function getArmorWeightForBaseRoles(
  roles: readonly CompanionBaseRoleId[]
): Exclude<CompanionArmorWeight, "no-weight"> {
  const worn = companionArmorWeights().filter((weight) => weight.armorType !== null)
  const named = new Set(roles.flatMap((id) => companionBaseRoleAt(id).validArmorWeights))
  const heaviest = worn.filter((weight) => named.has(weight.id)).at(-1) ?? worn[0]
  if (heaviest === undefined) throw new Error("no companion armor weight page states an armor type")
  return heaviest.id as Exclude<CompanionArmorWeight, "no-weight">
}

export function getBaseRoleName(roles: readonly CompanionBaseRoleId[]): string {
  if (roles.length === 0) return "No Role"
  const names = [...new Set(roles.map((id) => companionBaseRoleAt(id).name))]
  names.sort()
  return names.join(" + ")
}
