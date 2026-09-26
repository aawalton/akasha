import type { CompanionArmorWeight } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-weights/companion-armor-weights.module.code.ts"
import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionTraitId } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"
import type { CompanionWeaponRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-roles/companion-weapon-roles.module.code.ts"

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
  for (const roleId of roles) {
    if (roleId === "tank") return "heavy"
  }
  for (const roleId of roles) {
    if (roleId === "dps") return "medium"
  }
  return "light"
}

export function getBaseRoleName(roles: readonly CompanionBaseRoleId[]): string {
  if (roles.length === 0) return "No Role"
  const names = [...new Set(roles.map((id) => companionBaseRoleAt(id).name))]
  names.sort()
  return names.join(" + ")
}
