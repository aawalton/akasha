import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-enums-13"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-language-extensions"
import { GREEN } from "@akasha/design-tokens/semantic-color"
import { TEXT_PRIMARY, TEXT_TERTIARY } from "@akasha/design-tokens/text-color"
import { requireAt } from "@akasha/utils-narrow/require-at"
import {
  applyBuild,
  equipUpgrades,
} from "../companions-apply-build/companions-apply-build.module.code.ts"
import {
  ARMOR_SLOTS,
  type CompanionBuildData,
  captureCompanionBuild,
  JEWELRY_SLOTS,
  WEAPON_SLOTS,
} from "../companions-codec/companions-codec.module.code.ts"
import { decodeCompanionBuild } from "../companions-decoder/companions-decoder.module.code.ts"
import { SLOT_NAMES } from "../companions-display-names/companions-display-names.module.code.ts"
import {
  describeMismatch,
  EQUIPMENT_SLOT_COUNT,
  type EquipmentSlotGroup,
  evaluateEquipmentMatch,
  type SlotMismatch,
} from "../companions-equipment-match/companions-equipment-match.module.code.ts"
import { ALL_COMPANION_IDS } from "../companions-id-map/companions-id-map.module.code.ts"
import { scanForUpgrades } from "../companions-scan-upgrades/companions-scan-upgrades.module.code.ts"
import {
  captureAndSaveActiveCompanionBuild,
  getCleanCompanionName,
  getSavedCompanionBuild,
} from "../companions-selector/companions-selector.module.code.ts"
import { getTargetBuildHash } from "../companions-target-build-input/companions-target-build-input.module.code.ts"
export const SUMMARY_ROW_HEIGHT = 28
export const SUMMARY_ROW_SPACING = 4
export const SUMMARY_COL_NAME = 0
export const SUMMARY_COL_NAME_WIDTH = 140
export const SUMMARY_COL_EQUIP = 140
export const SUMMARY_COL_EQUIP_WIDTH = 80
export const SUMMARY_COL_UPGRADE = 220
export const SUMMARY_COL_UPGRADE_WIDTH = 50
export const SUMMARY_COL_SKILLS = 270
export const SUMMARY_COL_SKILLS_WIDTH = 80
export const SUMMARY_COL_BUILD = 350
export const SUMMARY_COL_BUILD_WIDTH = 60
export const SUMMARY_COL_APPLY = 410
export const SUMMARY_COL_APPLY_WIDTH = 60

export const COLOR_GREEN = GREEN
export const COLOR_GOLD: [number, number, number] = [0.98, 0.86, 0.24]
export const COLOR_ORANGE_RED: [number, number, number] = [0.9, 0.35, 0.15]

export function setGrayDash(label: LabelControl): undefined {
  label.SetText("-")
  label.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
}

export interface SummaryRow {
  nameLabel: LabelControl
  equipLabel: LabelControl
  upgradeLabel: LabelControl
  skillsLabel: LabelControl
  buildLabel: LabelControl
  applyLabel: LabelControl
}

export interface SummaryPanelState {
  panel: Control
  rows: SummaryRow[]
  companionIds: number[]
}

export let summaryState: SummaryPanelState | undefined

export function clearApplyLabel(row: SummaryRow): undefined {
  row.applyLabel.SetText("")
  row.applyLabel.SetHandler("OnMouseUp", undefined)
  row.applyLabel.SetHandler("OnMouseEnter", undefined)
  row.applyLabel.SetHandler("OnMouseExit", undefined)
}

export function getMatchColor(matched: number, total: number): readonly [number, number, number] {
  if (matched === total) return COLOR_GREEN
  if (matched >= total * 0.5) return COLOR_GOLD
  return COLOR_ORANGE_RED
}

export function getCurrentBuildData(companionId: number): CompanionBuildData | undefined {
  if (HasActiveCompanion() && GetActiveCompanionDefId() === companionId) {
    const build = captureCompanionBuild()
    if (build !== null) return build
  }

  const saved = getSavedCompanionBuild(companionId)
  if (saved !== undefined) {
    return decodeCompanionBuild(saved.hash)
  }

  return undefined
}

const SLOT_GROUP_EQUIP_SLOTS: Record<EquipmentSlotGroup, number[]> = {
  armor: ARMOR_SLOTS,
  jewelry: JEWELRY_SLOTS,
  weapons: WEAPON_SLOTS,
}

export function getMismatchSlotName(mismatch: SlotMismatch): string {
  const equipSlot = SLOT_GROUP_EQUIP_SLOTS[mismatch.group][mismatch.indexInGroup]
  if (equipSlot === undefined) return "Unknown"
  return SLOT_NAMES[equipSlot] ?? "Unknown"
}

export function clearEquipTooltip(row: SummaryRow): undefined {
  row.equipLabel.SetHandler("OnMouseEnter", undefined)
  row.equipLabel.SetHandler("OnMouseExit", undefined)
}

export function countMatchingSkills(
  current: CompanionBuildData,
  optimal: CompanionBuildData
): number {
  let matches = 0
  for (let i = 0; i < 6; i++) {
    if (current.skills[i] === optimal.skills[i]) {
      matches++
    }
  }
  return matches
}

export function createCompanionSummaryPanel(parent: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  panel.SetAnchorFill()
  panel.SetHidden(true)

  let offsetY = 0

  const headers = [
    { text: "Companion", left: SUMMARY_COL_NAME, width: SUMMARY_COL_NAME_WIDTH },
    { text: "Equipment", left: SUMMARY_COL_EQUIP, width: SUMMARY_COL_EQUIP_WIDTH },
    { text: "Upgr", left: SUMMARY_COL_UPGRADE, width: SUMMARY_COL_UPGRADE_WIDTH },
    { text: "Skills", left: SUMMARY_COL_SKILLS, width: SUMMARY_COL_SKILLS_WIDTH },
    { text: "Build", left: SUMMARY_COL_BUILD, width: SUMMARY_COL_BUILD_WIDTH },
    { text: "Apply", left: SUMMARY_COL_APPLY, width: SUMMARY_COL_APPLY_WIDTH },
  ]

  for (const h of headers) {
    const label = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    label.SetAnchor(TOPLEFT, panel, TOPLEFT, h.left, offsetY)
    label.SetDimensions(h.width, SUMMARY_ROW_HEIGHT)
    label.SetFont("ZoFontGameBold")
    label.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
    label.SetText(h.text)
    label.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    label.SetVerticalAlignment(TEXT_ALIGN_TOP)
  }

  offsetY = offsetY + SUMMARY_ROW_HEIGHT + SUMMARY_ROW_SPACING

  const rows: SummaryRow[] = []
  const companionIds = ALL_COMPANION_IDS

  for (const companionId of companionIds) {
    const nameLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    nameLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_NAME, offsetY)
    nameLabel.SetDimensions(SUMMARY_COL_NAME_WIDTH, SUMMARY_ROW_HEIGHT)
    nameLabel.SetFont("ZoFontGame")
    nameLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
    nameLabel.SetText(getCleanCompanionName(companionId))
    nameLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    nameLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

    const equipLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    equipLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_EQUIP, offsetY)
    equipLabel.SetDimensions(SUMMARY_COL_EQUIP_WIDTH, SUMMARY_ROW_HEIGHT)
    equipLabel.SetFont("ZoFontGame")
    equipLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    equipLabel.SetText("-")
    equipLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    equipLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)
    equipLabel.SetMouseEnabled(true)

    const upgradeLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    upgradeLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_UPGRADE, offsetY)
    upgradeLabel.SetDimensions(SUMMARY_COL_UPGRADE_WIDTH, SUMMARY_ROW_HEIGHT)
    upgradeLabel.SetFont("ZoFontGame")
    upgradeLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    upgradeLabel.SetText("-")
    upgradeLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    upgradeLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)
    upgradeLabel.SetMouseEnabled(true)

    const skillsLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    skillsLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_SKILLS, offsetY)
    skillsLabel.SetDimensions(SUMMARY_COL_SKILLS_WIDTH, SUMMARY_ROW_HEIGHT)
    skillsLabel.SetFont("ZoFontGame")
    skillsLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    skillsLabel.SetText("-")
    skillsLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    skillsLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

    const buildLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    buildLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_BUILD, offsetY)
    buildLabel.SetDimensions(SUMMARY_COL_BUILD_WIDTH, SUMMARY_ROW_HEIGHT)
    buildLabel.SetFont("ZoFontGame")
    buildLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    buildLabel.SetText("-")
    buildLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    buildLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

    const applyLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    applyLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_APPLY, offsetY)
    applyLabel.SetDimensions(SUMMARY_COL_APPLY_WIDTH, SUMMARY_ROW_HEIGHT)
    applyLabel.SetFont("ZoFontGame")
    applyLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    applyLabel.SetText("")
    applyLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    applyLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)
    applyLabel.SetMouseEnabled(true)

    rows.push({ nameLabel, equipLabel, upgradeLabel, skillsLabel, buildLabel, applyLabel })
    offsetY = offsetY + SUMMARY_ROW_HEIGHT + SUMMARY_ROW_SPACING
  }

  summaryState = { panel, rows, companionIds }
  return panel
}

export function refreshCompanionSummaryPanel(): undefined {
  if (!summaryState) return

  for (let i = 0; i < summaryState.companionIds.length; i++) {
    const companionId = requireAt(summaryState.companionIds, i, "companionIds")
    const row = requireAt(summaryState.rows, i, "summaryState.rows")

    const hash = getTargetBuildHash(companionId)

    if (hash === undefined) {
      setGrayDash(row.equipLabel)
      clearEquipTooltip(row)
      setGrayDash(row.upgradeLabel)
      row.upgradeLabel.SetHandler("OnMouseUp", undefined)
      row.upgradeLabel.SetHandler("OnMouseEnter", undefined)
      row.upgradeLabel.SetHandler("OnMouseExit", undefined)
      setGrayDash(row.skillsLabel)
      setGrayDash(row.buildLabel)
      clearApplyLabel(row)
      continue
    }

    row.buildLabel.SetText("Target")
    row.buildLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)

    const currentBuild = getCurrentBuildData(companionId)
    if (currentBuild === undefined) {
      setGrayDash(row.equipLabel)
      clearEquipTooltip(row)
      setGrayDash(row.upgradeLabel)
      row.upgradeLabel.SetHandler("OnMouseUp", undefined)
      row.upgradeLabel.SetHandler("OnMouseEnter", undefined)
      row.upgradeLabel.SetHandler("OnMouseExit", undefined)
      setGrayDash(row.skillsLabel)
      continue
    }

    const optimalBuild = decodeCompanionBuild(hash)
    if (optimalBuild === undefined) {
      setGrayDash(row.equipLabel)
      clearEquipTooltip(row)
      setGrayDash(row.upgradeLabel)
      row.upgradeLabel.SetHandler("OnMouseUp", undefined)
      row.upgradeLabel.SetHandler("OnMouseEnter", undefined)
      row.upgradeLabel.SetHandler("OnMouseExit", undefined)
      setGrayDash(row.skillsLabel)
      continue
    }

    const equipMatch = evaluateEquipmentMatch(currentBuild, optimalBuild)
    const skillMatches = countMatchingSkills(currentBuild, optimalBuild)

    const [er, eg, eb] = getMatchColor(equipMatch.matchedCount, EQUIPMENT_SLOT_COUNT)
    row.equipLabel.SetText(`${equipMatch.matchedCount}/${EQUIPMENT_SLOT_COUNT}`)
    row.equipLabel.SetColor(er, eg, eb, 1)

    if (equipMatch.mismatches.length > 0) {
      const shortfallLines = equipMatch.mismatches.map((mismatch) =>
        describeMismatch(getMismatchSlotName(mismatch), mismatch.dimensions)
      )
      row.equipLabel.SetHandler("OnMouseEnter", () => {
        InitializeTooltip(InformationTooltip, row.equipLabel, BOTTOM, 0, 0, TOP)
        SetTooltipText(InformationTooltip, "Below target:")
        for (const line of shortfallLines) {
          SetTooltipText(InformationTooltip, line)
        }
      })
      row.equipLabel.SetHandler("OnMouseExit", () => {
        ClearTooltip(InformationTooltip)
      })
    } else {
      clearEquipTooltip(row)
    }

    const [sr, sg, sb] = getMatchColor(skillMatches, 6)
    row.skillsLabel.SetText(`${skillMatches}/6`)
    row.skillsLabel.SetColor(sr, sg, sb, 1)

    const isActive = HasActiveCompanion() && GetActiveCompanionDefId() === companionId
    const upgradeScan = isActive ? scanForUpgrades(companionId, hash) : undefined
    if (upgradeScan !== undefined) {
      const count = upgradeScan.totalUpgradeCount
      row.upgradeLabel.SetText(`${count}`)
      row.upgradeLabel.SetColor(COLOR_GREEN[0], COLOR_GREEN[1], COLOR_GREEN[2], 1)
      row.upgradeLabel.SetHandler("OnMouseUp", () => {
        const freshScan = scanForUpgrades(companionId, hash)
        if (freshScan !== undefined) {
          equipUpgrades(freshScan)
          const totalDelay = freshScan.totalUpgradeCount * 200 + 500
          zo_callLater(() => {
            captureAndSaveActiveCompanionBuild()
            TemperCharacters.TabManager.RefreshActivePanel()
          }, totalDelay)
        }
      })
      row.upgradeLabel.SetHandler("OnMouseEnter", () => {
        InitializeTooltip(InformationTooltip, row.upgradeLabel, BOTTOM, 0, 0, TOP)
        SetTooltipText(InformationTooltip, `${count} upgrade(s) available. Click to equip.`)
      })
      row.upgradeLabel.SetHandler("OnMouseExit", () => {
        ClearTooltip(InformationTooltip)
      })
    } else {
      setGrayDash(row.upgradeLabel)
      row.upgradeLabel.SetHandler("OnMouseUp", undefined)
      row.upgradeLabel.SetHandler("OnMouseEnter", undefined)
      row.upgradeLabel.SetHandler("OnMouseExit", undefined)
    }

    if (isActive) {
      row.applyLabel.SetText("Apply")
      row.applyLabel.SetColor(COLOR_GREEN[0], COLOR_GREEN[1], COLOR_GREEN[2], 1)
      row.applyLabel.SetHandler("OnMouseUp", () => {
        applyBuild(companionId, hash)
        zo_callLater(() => {
          captureAndSaveActiveCompanionBuild()
          TemperCharacters.TabManager.RefreshActivePanel()
        }, 1500)
      })
      row.applyLabel.SetHandler("OnMouseEnter", () => {
        InitializeTooltip(InformationTooltip, row.applyLabel, BOTTOM, 0, 0, TOP)
        SetTooltipText(InformationTooltip, "Apply target build")
      })
      row.applyLabel.SetHandler("OnMouseExit", () => {
        ClearTooltip(InformationTooltip)
      })
    } else {
      clearApplyLabel(row)
    }
  }
}
