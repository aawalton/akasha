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
import { TEXT_SECONDARY } from "@akasha/design-tokens/text-color"
import { requireAt } from "@akasha/utils-narrow/require-at"
import {
  ARMOR_SLOTS,
  JEWELRY_SLOTS,
  WEAPON_SLOTS,
} from "../companions-codec/companions-codec.module.code.ts"
import {
  createEquipRowsForSection,
  type EquipmentRow,
} from "../companions-equipment-rows/companions-equipment-rows.module.code.ts"
import {
  type SlotUpgrade,
  scanForUpgrades,
  type UpgradeScanResult,
} from "../companions-scan-upgrades/companions-scan-upgrades.module.code.ts"
import {
  captureAndSaveActiveCompanionBuild,
  createCompanionDropdown,
  DROPDOWN_BOTTOM_MARGIN,
  DROPDOWN_HEIGHT,
} from "../companions-selector/companions-selector.module.code.ts"
import { getTargetBuildHash } from "../companions-target-build-input/companions-target-build-input.module.code.ts"
export interface EquipmentPanelState {
  panel: Control
  noCompanionLabel: LabelControl
  dataContainer: Control
  armorRows: EquipmentRow[]
  jewelryRows: EquipmentRow[]
  weaponRows: EquipmentRow[]
  lastUpgradeScan: UpgradeScanResult | undefined
}

export let equipState: EquipmentPanelState | undefined

export function createCompanionEquipmentPanel(parent: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  panel.SetAnchorFill()
  panel.SetHidden(true)

  createCompanionDropdown(panel)
  const contentTop = DROPDOWN_HEIGHT + DROPDOWN_BOTTOM_MARGIN

  const noCompanionLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
  noCompanionLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, contentTop + 20)
  noCompanionLabel.SetDimensions(400, 40)
  noCompanionLabel.SetFont("ZoFontGame")
  noCompanionLabel.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
  noCompanionLabel.SetText("Summon a companion to view build details")
  noCompanionLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  noCompanionLabel.SetHidden(true)

  const dataContainer = WINDOW_MANAGER.CreateControl(undefined, panel, CT_CONTROL)
  dataContainer.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, contentTop)
  dataContainer.SetAnchor(BOTTOMRIGHT, panel, BOTTOMRIGHT, 0, 0)
  dataContainer.SetHidden(true)

  let offsetY = 0

  const [armorRows, afterArmor] = createEquipRowsForSection(
    dataContainer,
    offsetY,
    "Armor",
    ARMOR_SLOTS
  )
  offsetY = afterArmor

  const [jewelryRows, afterJewelry] = createEquipRowsForSection(
    dataContainer,
    offsetY,
    "Jewelry",
    JEWELRY_SLOTS
  )
  offsetY = afterJewelry

  const [weaponRows] = createEquipRowsForSection(dataContainer, offsetY, "Weapons", WEAPON_SLOTS)

  equipState = {
    panel,
    noCompanionLabel,
    dataContainer,
    armorRows,
    jewelryRows,
    weaponRows,
    lastUpgradeScan: undefined,
  }

  return panel
}

export function setUpgradeRowIcons(
  rows: EquipmentRow[],
  upgrades: (SlotUpgrade | undefined)[]
): undefined {
  for (let i = 0; i < rows.length; i++) {
    const row = requireAt(rows, i, "rows")
    const upgrade = upgrades[i]
    if (upgrade !== undefined) {
      row.upgradeIcon.SetHidden(false)
      row.upgradeIcon.SetHandler("OnMouseUp", () => {
        RequestEquipItem(BAG_BACKPACK, upgrade.bagSlot, BAG_COMPANION_WORN, upgrade.equipSlot)
        zo_callLater(() => {
          captureAndSaveActiveCompanionBuild()
          TemperCharacters.TabManager.RefreshActivePanel()
        }, 500)
      })
      row.upgradeIcon.SetHandler("OnMouseEnter", () => {
        InitializeTooltip(InformationTooltip, row.upgradeIcon, BOTTOM, 0, 0, TOP)
        SetTooltipText(InformationTooltip, "Click to equip upgrade")
      })
      row.upgradeIcon.SetHandler("OnMouseExit", () => {
        ClearTooltip(InformationTooltip)
      })
    } else {
      row.upgradeIcon.SetHidden(true)
      row.upgradeIcon.SetHandler("OnMouseUp", undefined)
      row.upgradeIcon.SetHandler("OnMouseEnter", undefined)
      row.upgradeIcon.SetHandler("OnMouseExit", undefined)
    }
  }
}

export function refreshUpgradeIndicators(companionId: number): undefined {
  if (!equipState) return

  const hash = getTargetBuildHash(companionId)
  if (hash === undefined) {
    hideUpgradeIndicators()
    return
  }

  const result = scanForUpgrades(companionId, hash)
  equipState.lastUpgradeScan = result

  if (result === undefined) {
    hideUpgradeIndicators()
    return
  }

  setUpgradeRowIcons(equipState.armorRows, result.armorUpgrades)
  setUpgradeRowIcons(equipState.jewelryRows, result.jewelryUpgrades)
  setUpgradeRowIcons(equipState.weaponRows, result.weaponUpgrades)
}

export function hideUpgradeIndicators(): undefined {
  if (!equipState) return
  equipState.lastUpgradeScan = undefined

  for (const row of equipState.armorRows) {
    row.upgradeIcon.SetHidden(true)
    row.upgradeIcon.SetHandler("OnMouseUp", undefined)
    row.upgradeIcon.SetHandler("OnMouseEnter", undefined)
    row.upgradeIcon.SetHandler("OnMouseExit", undefined)
  }
  for (const row of equipState.jewelryRows) {
    row.upgradeIcon.SetHidden(true)
    row.upgradeIcon.SetHandler("OnMouseUp", undefined)
    row.upgradeIcon.SetHandler("OnMouseEnter", undefined)
    row.upgradeIcon.SetHandler("OnMouseExit", undefined)
  }
  for (const row of equipState.weaponRows) {
    row.upgradeIcon.SetHidden(true)
    row.upgradeIcon.SetHandler("OnMouseUp", undefined)
    row.upgradeIcon.SetHandler("OnMouseEnter", undefined)
    row.upgradeIcon.SetHandler("OnMouseExit", undefined)
  }
}

export function hideOptimalColumn(): undefined {
  if (!equipState) return

  for (const row of equipState.armorRows) {
    row.optimalLabel.SetHidden(true)
  }
  for (const row of equipState.jewelryRows) {
    row.optimalLabel.SetHidden(true)
  }
  for (const row of equipState.weaponRows) {
    row.optimalLabel.SetHidden(true)
  }
}
