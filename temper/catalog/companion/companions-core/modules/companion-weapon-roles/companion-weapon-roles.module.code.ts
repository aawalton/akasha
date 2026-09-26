import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

export type CompanionWeaponRoleId = string

export interface CompanionWeaponRoleTemplate {
  readonly id: CompanionWeaponRoleId
  readonly name: string
  readonly weaponSkillLineId: string
  readonly validMainHandWeaponTypes: readonly string[]
  readonly validOffHandWeaponTypes: readonly string[]
}

export function companionWeaponRoles(): readonly CompanionWeaponRoleTemplate[] {
  return companionCatalog().weaponRoles
}

export function companionWeaponRoleAt(id: CompanionWeaponRoleId): CompanionWeaponRoleTemplate {
  const role = companionWeaponRoles().find((one) => one.id === id)
  if (role === undefined) throw new Error(`no companion weapon role page answers to \`${id}\``)
  return role
}
