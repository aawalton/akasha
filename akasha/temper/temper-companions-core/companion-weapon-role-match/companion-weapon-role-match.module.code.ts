import { randomFrom } from "@akasha/temper-formula-framework/random-from"
import type { CompanionState } from "../companion-types/companion-types.module.code.ts"
import {
  type CompanionWeaponRoleId,
  companionWeaponRoles,
} from "../companion-weapon-roles/companion-weapon-roles.module.code.ts"
import {
  type CompanionWeaponTypeId,
  companionWeaponTypes,
} from "../companion-weapon-types/companion-weapon-types.module.code.ts"

const NO_WEAPON_ROLE: CompanionWeaponRoleId = "no-weapon-role"

const NO_WEAPON_TYPE: CompanionWeaponTypeId = "no-type"

function narrowToWeaponTypeId(raw: string, label: string): CompanionWeaponTypeId {
  if (!companionWeaponTypes.has(raw)) {
    throw new Error(`${label}: '${raw}' is not a known CompanionWeaponTypeId`)
  }
  return raw
}

export function getWeaponRole(state: CompanionState): CompanionWeaponRoleId {
  const mainHand = state.equipment.weapons["main-hand"]
  const offHand = state.equipment.weapons["off-hand"]

  const mainType: CompanionWeaponTypeId =
    mainHand.itemType === "weapon" ? mainHand.data.type : NO_WEAPON_TYPE
  const offType: CompanionWeaponTypeId =
    offHand.itemType === "weapon" ? offHand.data.type : NO_WEAPON_TYPE

  for (const role of companionWeaponRoles.list) {
    if (role.id === NO_WEAPON_ROLE) continue

    const main: readonly string[] = role.validMainHandWeaponTypes
    const off: readonly string[] = role.validOffHandWeaponTypes

    const mainValid = main.includes(mainType)
    const offValid = off.length === 0 ? offType === NO_WEAPON_TYPE : off.includes(offType)

    if (mainValid && offValid) return role.id
  }

  return NO_WEAPON_ROLE
}

export function setWeaponTypesForRole(
  state: CompanionState,
  roleId: CompanionWeaponRoleId
): CompanionState {
  const role = companionWeaponRoles.data[roleId]
  const mains: readonly string[] = role.validMainHandWeaponTypes
  const offs: readonly string[] = role.validOffHandWeaponTypes
  const mainHandType = narrowToWeaponTypeId(randomFrom(mains), `weapon-role ${roleId} main-hand`)
  const offHandType: CompanionWeaponTypeId =
    offs.length > 0
      ? narrowToWeaponTypeId(randomFrom(offs), `weapon-role ${roleId} off-hand`)
      : NO_WEAPON_TYPE

  const mainHand = state.equipment.weapons["main-hand"]
  const offHand = state.equipment.weapons["off-hand"]

  return {
    ...state,
    equipment: {
      ...state.equipment,
      weapons: {
        "main-hand":
          mainHand.itemType === "weapon"
            ? { itemType: "weapon", data: { ...mainHand.data, type: mainHandType } }
            : mainHand,
        "off-hand":
          offHand.itemType === "weapon"
            ? { itemType: "weapon", data: { ...offHand.data, type: offHandType } }
            : offHand,
      },
    },
  }
}
