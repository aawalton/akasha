import {
  asTypeBoolMapOpt,
  asTypeNameMapOpt,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import { asTypeToSetIdsTable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts-tables/sets-core-casts-tables.module.code.ts"
import { safeReturnAPItable } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-helpers/sets-core-helpers.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

type SetIdBoolTable = { [setId: number]: boolean | undefined }

function getSetArmorTypes(this: void, setId: number | undefined): unknown {
  const armorTypesOfSet: SetIdBoolTable = {}
  const armorTypeNames = asTypeNameMapOpt(lib.armorTypeNames)
  if (armorTypeNames === undefined) {
    return undefined
  }
  const armorTypesSets = asTypeToSetIdsTable(lib.armorTypesSets)
  for (const [armorType] of pairs(armorTypeNames)) {
    const armorTypeData = armorTypesSets[armorType]
    if (armorTypeData !== undefined) {
      armorTypesOfSet[armorType] = (setId !== undefined ? armorTypeData[setId] : undefined) ?? false
    }
  }
  return safeReturnAPItable(armorTypesOfSet)
}
lib.GetSetArmorTypes = getSetArmorTypes

function getArmorTypeName(this: void, armorType: number | undefined): string | undefined {
  if (armorType === ARMORTYPE_NONE) {
    return undefined
  }
  const armorTypeNames = asTypeNameMapOpt(lib.armorTypeNames)
  if (armorType === undefined || armorTypeNames === undefined) {
    return undefined
  }
  const armorTypeName = armorTypeNames[armorType]
  return armorTypeName
}
lib.GetArmorTypeName = getArmorTypeName

function getItemsArmorType(this: void, itemId: number | undefined): number | undefined {
  const buildItemLink = lib.buildItemLink
  const itemLink = itemId !== undefined ? buildItemLink(itemId) : undefined
  if (itemLink !== undefined) {
    const armorTypeOfSetItem = GetItemLinkArmorType(itemLink)
    if (armorTypeOfSetItem !== undefined && armorTypeOfSetItem !== ARMORTYPE_NONE) {
      return armorTypeOfSetItem
    }
  }
  return undefined
}
lib.GetItemsArmorType = getItemsArmorType

function getSetWeaponTypes(this: void, setId: number | undefined): SetIdBoolTable | undefined {
  const weaponTypesOfSet: SetIdBoolTable = {}
  const weaponTypeNames = asTypeNameMapOpt(lib.weaponTypeNames)
  if (weaponTypeNames === undefined) {
    return undefined
  }
  const weaponTypesSets = asTypeToSetIdsTable(lib.weaponTypesSets)
  for (const [weaponType] of pairs(weaponTypeNames)) {
    const weaponTypeData = weaponTypesSets[weaponType]
    if (weaponTypeData !== undefined) {
      weaponTypesOfSet[weaponType] =
        (setId !== undefined ? weaponTypeData[setId] : undefined) ?? false
    }
  }
  return weaponTypesOfSet
}
lib.GetSetWeaponTypes = getSetWeaponTypes

function getItemsWeaponType(this: void, itemId: number | undefined): number | undefined {
  const buildItemLink = lib.buildItemLink
  const itemLink = itemId !== undefined ? buildItemLink(itemId) : undefined
  if (itemLink !== undefined) {
    const weaponTypeOfSetItem = GetItemLinkWeaponType(itemLink)
    if (weaponTypeOfSetItem !== undefined && weaponTypeOfSetItem !== WEAPONTYPE_NONE) {
      return weaponTypeOfSetItem
    }
  }
  return undefined
}
lib.GetItemsWeaponType = getItemsWeaponType

function getSetEquipTypes(this: void, setId: number | undefined): SetIdBoolTable | undefined {
  const equipTypesOfSet: SetIdBoolTable = {}
  const equipTypesValid = asTypeBoolMapOpt(lib.equipTypesValid)
  if (equipTypesValid === undefined) {
    return undefined
  }
  const weaponTypesSets = asTypeToSetIdsTable(lib.weaponTypesSets)
  for (const [equipType] of pairs(equipTypesValid)) {
    const equipTypeData = weaponTypesSets[equipType]
    if (equipTypeData !== undefined) {
      equipTypesOfSet[equipType] = (setId !== undefined ? equipTypeData[setId] : undefined) ?? false
    }
  }
  return equipTypesOfSet
}
lib.GetSetEquipTypes = getSetEquipTypes
