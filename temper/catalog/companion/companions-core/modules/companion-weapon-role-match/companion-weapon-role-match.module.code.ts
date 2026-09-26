import type { CompanionState } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import {
  type CompanionWeaponRoleId,
  companionWeaponRoles,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-roles/companion-weapon-roles.module.code.ts"
import type { CompanionWeaponTypeId } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"

const NO_WEAPON_ROLE: CompanionWeaponRoleId = "no-weapon-role"

const NO_WEAPON_TYPE: CompanionWeaponTypeId = "no-type"

export function getWeaponRole(state: CompanionState): CompanionWeaponRoleId {
  const mainHand = state.equipment.weapons["main-hand"]
  const offHand = state.equipment.weapons["off-hand"]

  const mainType: CompanionWeaponTypeId =
    mainHand.itemType === "weapon" ? mainHand.data.type : NO_WEAPON_TYPE
  const offType: CompanionWeaponTypeId =
    offHand.itemType === "weapon" ? offHand.data.type : NO_WEAPON_TYPE

  for (const role of companionWeaponRoles()) {
    if (role.id === NO_WEAPON_ROLE) continue

    const main: readonly string[] = role.validMainHandWeaponTypes
    const off: readonly string[] = role.validOffHandWeaponTypes

    const mainValid = main.includes(mainType)
    const offValid = off.length === 0 ? offType === NO_WEAPON_TYPE : off.includes(offType)

    if (mainValid && offValid) return role.id
  }

  return NO_WEAPON_ROLE
}
