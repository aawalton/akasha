import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-language-extensions"
import { TEXT_TERTIARY } from "@akasha/design-tokens/text-color"
import { requireAt } from "@akasha/utils-narrow/require-at"
import {
  ARMOR_SLOTS,
  type CompanionBuildData,
  JEWELRY_SLOTS,
  WEAPON_SLOTS,
} from "../companions-codec/companions-codec.module.code.ts"
import { decodeCompanionBuild } from "../companions-decoder/companions-decoder.module.code.ts"
import { SLOT_NAMES } from "../companions-display-names/companions-display-names.module.code.ts"
import {
  formatArmorSlot,
  formatJewelrySlot,
  formatWeaponSlot,
  getQualityColorForSlot,
} from "../companions-equipment-formatters/companions-equipment-formatters.module.code.ts"
import {
  equipState,
  hideOptimalColumn,
  hideUpgradeIndicators,
  refreshUpgradeIndicators,
} from "../companions-equipment-panel/companions-equipment-panel.module.code.ts"
import { TWO_HANDED_TYPES } from "../companions-equipment-rows/companions-equipment-rows.module.code.ts"
import {
  formatArmorFromIndices,
  formatJewelryFromIndices,
  formatWeaponFromIndices,
  getQualityColorFromIndex,
  isWeaponIndexTwoHanded,
} from "../companions-reverse-mappings/companions-reverse-mappings.module.code.ts"
import type { SavedCompanionBuild } from "../companions-saved-variables/companions-saved-variables.module.code.ts"
import {
  getCleanCompanionName,
  getSavedCompanionBuild,
  getSelectedCompanionId,
  isSelectedCompanionActive,
} from "../companions-selector/companions-selector.module.code.ts"
import { getTargetBuildHash } from "../companions-target-build-input/companions-target-build-input.module.code.ts"
export function refreshEquipmentOptimalColumn(decoded: CompanionBuildData): undefined {
  if (!equipState) return

  for (let i = 0; i < equipState.armorRows.length; i++) {
    const row = requireAt(equipState.armorRows, i, "armorRows")
    const slot = decoded.armor[i]
    if (slot !== undefined) {
      row.optimalLabel.SetText(
        formatArmorFromIndices(slot.isEmpty, slot.weightIndex, slot.traitIndex)
      )
      const [r, g, b] = getQualityColorFromIndex(slot.qualityIndex)
      row.optimalLabel.SetColor(r, g, b, 1)
    } else {
      row.optimalLabel.SetText("Empty")
      row.optimalLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    }
    row.optimalLabel.SetHidden(false)
  }

  for (let i = 0; i < equipState.jewelryRows.length; i++) {
    const row = requireAt(equipState.jewelryRows, i, "jewelryRows")
    const slot = decoded.jewelry[i]
    if (slot !== undefined) {
      row.optimalLabel.SetText(formatJewelryFromIndices(slot.isEmpty, slot.traitIndex))
      const [r, g, b] = getQualityColorFromIndex(slot.qualityIndex)
      row.optimalLabel.SetColor(r, g, b, 1)
    } else {
      row.optimalLabel.SetText("Empty")
      row.optimalLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    }
    row.optimalLabel.SetHidden(false)
  }

  const mainWeapon = decoded.weapons[0]
  const isTwoHanded = mainWeapon !== undefined && isWeaponIndexTwoHanded(mainWeapon.typeIndex)

  for (let i = 0; i < equipState.weaponRows.length; i++) {
    const row = requireAt(equipState.weaponRows, i, "weaponRows")
    const slot = decoded.weapons[i]
    const isOffHand = i === 1
    const hidden = isOffHand && isTwoHanded

    if (hidden) {
      row.optimalLabel.SetHidden(true)
    } else if (slot !== undefined) {
      row.optimalLabel.SetText(
        formatWeaponFromIndices(slot.isEmpty, slot.typeIndex, slot.traitIndex)
      )
      const [r, g, b] = getQualityColorFromIndex(slot.qualityIndex)
      row.optimalLabel.SetColor(r, g, b, 1)
      row.optimalLabel.SetHidden(false)
    } else {
      row.optimalLabel.SetText("Empty")
      row.optimalLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
      row.optimalLabel.SetHidden(false)
    }
  }
}

export function refreshEquipmentFromLive(): undefined {
  if (!equipState) return

  for (let i = 0; i < ARMOR_SLOTS.length; i++) {
    const slot = requireAt(ARMOR_SLOTS, i, "ARMOR_SLOTS")
    const row = requireAt(equipState.armorRows, i, "armorRows")
    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    row.valueLabel.SetText(formatArmorSlot(slot))
    const [r, g, b] = getQualityColorForSlot(slot)
    row.valueLabel.SetColor(r, g, b, 1)
    row.slotLabel.SetHidden(false)
    row.valueLabel.SetHidden(false)
  }

  for (let i = 0; i < JEWELRY_SLOTS.length; i++) {
    const slot = requireAt(JEWELRY_SLOTS, i, "JEWELRY_SLOTS")
    const row = requireAt(equipState.jewelryRows, i, "jewelryRows")
    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    row.valueLabel.SetText(formatJewelrySlot(slot))
    const [r, g, b] = getQualityColorForSlot(slot)
    row.valueLabel.SetColor(r, g, b, 1)
    row.slotLabel.SetHidden(false)
    row.valueLabel.SetHidden(false)
  }

  const mainHandType = GetItemWeaponType(BAG_COMPANION_WORN, EQUIP_SLOT_MAIN_HAND)
  const isTwoHanded = TWO_HANDED_TYPES[mainHandType] === true

  for (let i = 0; i < WEAPON_SLOTS.length; i++) {
    const slot = requireAt(WEAPON_SLOTS, i, "WEAPON_SLOTS")
    const row = requireAt(equipState.weaponRows, i, "weaponRows")
    const isOffHand = slot === EQUIP_SLOT_OFF_HAND
    const hidden = isOffHand && isTwoHanded

    row.slotLabel.SetHidden(hidden)
    row.valueLabel.SetHidden(hidden)

    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    row.valueLabel.SetText(formatWeaponSlot(slot))
    const [r, g, b] = getQualityColorForSlot(slot)
    row.valueLabel.SetColor(r, g, b, 1)
  }
}

export function refreshEquipmentFromSaved(saved: SavedCompanionBuild): undefined {
  if (!equipState) return

  for (let i = 0; i < ARMOR_SLOTS.length; i++) {
    const slot = requireAt(ARMOR_SLOTS, i, "ARMOR_SLOTS")
    const row = requireAt(equipState.armorRows, i, "armorRows")
    const savedSlot = saved.armor[i]
    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    row.slotLabel.SetHidden(false)
    row.valueLabel.SetHidden(false)
    if (savedSlot !== undefined) {
      row.valueLabel.SetText(savedSlot.displayText)
      const [r, g, b] = savedSlot.qualityColor
      row.valueLabel.SetColor(r, g, b, 1)
    } else {
      row.valueLabel.SetText("Empty")
      row.valueLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    }
  }

  for (let i = 0; i < JEWELRY_SLOTS.length; i++) {
    const slot = requireAt(JEWELRY_SLOTS, i, "JEWELRY_SLOTS")
    const row = requireAt(equipState.jewelryRows, i, "jewelryRows")
    const savedSlot = saved.jewelry[i]
    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    row.slotLabel.SetHidden(false)
    row.valueLabel.SetHidden(false)
    if (savedSlot !== undefined) {
      row.valueLabel.SetText(savedSlot.displayText)
      const [r, g, b] = savedSlot.qualityColor
      row.valueLabel.SetColor(r, g, b, 1)
    } else {
      row.valueLabel.SetText("Empty")
      row.valueLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    }
  }

  const isTwoHanded = TWO_HANDED_TYPES[saved.mainHandWeaponType] === true

  for (let i = 0; i < WEAPON_SLOTS.length; i++) {
    const slot = requireAt(WEAPON_SLOTS, i, "WEAPON_SLOTS")
    const row = requireAt(equipState.weaponRows, i, "weaponRows")
    const savedSlot = saved.weapons[i]
    const isOffHand = slot === EQUIP_SLOT_OFF_HAND
    const hidden = isOffHand && isTwoHanded

    row.slotLabel.SetHidden(hidden)
    row.valueLabel.SetHidden(hidden)

    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    if (savedSlot !== undefined) {
      row.valueLabel.SetText(savedSlot.displayText)
      const [r, g, b] = savedSlot.qualityColor
      row.valueLabel.SetColor(r, g, b, 1)
    } else {
      row.valueLabel.SetText("Empty")
      row.valueLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    }
  }
}

export function refreshCompanionEquipmentPanel(): undefined {
  if (!equipState) return

  const selectedCompanionId = getSelectedCompanionId()

  if (selectedCompanionId === undefined) {
    equipState.noCompanionLabel.SetText("Select a companion from the dropdown")
    equipState.noCompanionLabel.SetHidden(false)
    equipState.dataContainer.SetHidden(true)
    return
  }

  if (isSelectedCompanionActive()) {
    equipState.noCompanionLabel.SetHidden(true)
    equipState.dataContainer.SetHidden(false)
    refreshEquipmentFromLive()
    refreshOptimalEquipmentColumn(selectedCompanionId)
    refreshUpgradeIndicators(selectedCompanionId)
    return
  }

  const saved = getSavedCompanionBuild(selectedCompanionId)
  if (saved) {
    equipState.noCompanionLabel.SetHidden(true)
    equipState.dataContainer.SetHidden(false)
    refreshEquipmentFromSaved(saved)
    refreshOptimalEquipmentColumn(selectedCompanionId)
    hideUpgradeIndicators()
    return
  }

  const companionName = getCleanCompanionName(selectedCompanionId)
  equipState.noCompanionLabel.SetText(`Summon ${companionName} to capture their build`)
  equipState.noCompanionLabel.SetHidden(false)
  equipState.dataContainer.SetHidden(true)
  hideUpgradeIndicators()
}

export function refreshOptimalEquipmentColumn(companionId: number): undefined {
  const hash = getTargetBuildHash(companionId)
  if (hash === undefined) {
    hideOptimalColumn()
    return
  }

  const decoded = decodeCompanionBuild(hash)
  if (decoded === undefined) {
    hideOptimalColumn()
    return
  }

  refreshEquipmentOptimalColumn(decoded)
}
