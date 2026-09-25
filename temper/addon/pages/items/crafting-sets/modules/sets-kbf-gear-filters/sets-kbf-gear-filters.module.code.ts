import type { FilterBuildContext } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-kbf-filter-context/sets-kbf-filter-context.module.code.ts"
import { LSM_DEFAULT_COMBO_BOX_OPTIONS } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-kbf-lsm-options/sets-kbf-lsm-options.module.code.ts"
import { sortFilterComboBox } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-kbf-sorting/sets-kbf-sorting.module.code.ts"
import {
  defaultMultiSelectSelectedText,
  setupFilterDropdown,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-search-ui-keyboard-filters-setup/sets-search-ui-keyboard-filters-setup.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const zoitf = zo_iconTextFormat
const getLocalizedText = lib.GetLocalizedText
const buildSetTypeInfo = lib.buildSetTypeInfo
const getEquipSlotTexture = lib.GetEquipSlotTexture
const getArmorTypeTexture = lib.GetArmorTypeTexture
const getWeaponTypeTexture = lib.GetWeaponTypeTexture

export function buildSetTypeFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("setType")
  const setTypeDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.setTypeFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: false,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.setTypeFiltersDropdown = setTypeDropdown
  for (const [setType, isValid] of pairs(lib.allowedSetTypes)) {
    if (isValid === true) {
      const [setTypeName, setTypeTexture] = buildSetTypeInfo({ setType }, true)
      if (setTypeName !== undefined) {
        let setTypeNameStr = setTypeName
        if (setTypeTexture !== undefined) {
          setTypeNameStr = zoitf(setTypeTexture, 24, 24, setTypeName, undefined)
        }
        const entry = setTypeDropdown.CreateItemEntry(setTypeNameStr)
        entry.filterType = setType
        entry.nameClean = setTypeName
        setTypeDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
      }
    }
  }
  sortFilterComboBox(setTypeDropdown, "nameClean")
}

export function buildArmorTypeFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("armorType")
  const armorTypeDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.armorTypeFiltersControl,
    filterTypeText,
    multiSelectSelectedText: SI_ITEM_SETS_BOOK_APPAREL_TYPES_DROPDOWN_TEXT,
    sortsItems: false,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.armorTypeFiltersDropdown = armorTypeDropdown
  for (const [armorType] of pairs(lib.armorTypesSets)) {
    const [, armorTypeNameStr, armorTypeName] = getArmorTypeTexture(armorType)
    const entry = armorTypeDropdown.CreateItemEntry(armorTypeNameStr)
    entry.filterType = armorType
    entry.nameClean = armorTypeName
    armorTypeDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
  }
  sortFilterComboBox(armorTypeDropdown, "nameClean")
}

export function buildWeaponTypeFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("weaponType")
  const weaponTypeDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.weaponTypeFiltersControl,
    filterTypeText,
    multiSelectSelectedText: SI_ITEM_SETS_BOOK_WEAPON_TYPES_DROPDOWN_TEXT,
    sortsItems: false,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.weaponTypeFiltersDropdown = weaponTypeDropdown
  for (const [weaponType] of pairs(lib.weaponTypesSets)) {
    const [, weaponTypeNameStr, weaponTypeName] = getWeaponTypeTexture(weaponType)
    const entry = weaponTypeDropdown.CreateItemEntry(weaponTypeNameStr ?? "")
    entry.filterType = weaponType
    entry.nameClean = weaponTypeName
    weaponTypeDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
  }
  sortFilterComboBox(weaponTypeDropdown, "nameClean")
}

export function buildEquipmentTypeFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("equipmentType")
  const equipmentTypeDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.equipmentTypeFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: false,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.equipmentTypeFiltersDropdown = equipmentTypeDropdown
  for (const [equipType, isValid] of pairs(lib.equipTypesValid)) {
    if (isValid === true) {
      const [, equipTypeNameStr, equipTypeName] = getEquipSlotTexture(equipType)
      const entry = equipmentTypeDropdown.CreateItemEntry(equipTypeNameStr)
      entry.filterType = equipType
      entry.nameClean = equipTypeName
      equipmentTypeDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
    }
  }
  sortFilterComboBox(equipmentTypeDropdown, "nameClean")
}
