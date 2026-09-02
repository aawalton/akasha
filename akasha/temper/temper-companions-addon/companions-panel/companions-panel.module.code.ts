import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-05"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-language-extensions"
import { TEXT_PRIMARY, TEXT_SECONDARY } from "@akasha/design-tokens/text-color"
import {
  createCompanionDropdown,
  DROPDOWN_BOTTOM_MARGIN,
  DROPDOWN_HEIGHT,
  getCleanCompanionName,
  getSavedCompanionBuild,
  getSelectedCompanionId,
  isSelectedCompanionActive,
} from "../companions-selector/companions-selector.module.code.ts"
export const ROW_HEIGHT = 28
export const ROW_SPACING = 4
export const KEY_WIDTH = 120

export interface CompanionPanelState {
  panel: Control
  noCompanionLabel: LabelControl
  dataContainer: Control
  nameValue: LabelControl
  levelKeyLabel: LabelControl
  levelValue: LabelControl
  xpKeyLabel: LabelControl
  xpValue: LabelControl
  rapportKeyLabel: LabelControl
  rapportLevelValue: LabelControl
  rapportDescKeyLabel: LabelControl
  rapportDescValue: LabelControl
}

export let state: CompanionPanelState | undefined

export function createKeyValueRow(
  parent: Control,
  offsetY: number,
  keyText: string
): LuaMultiReturn<[LabelControl, LabelControl, number]> {
  const keyLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  keyLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, 0, offsetY)
  keyLabel.SetDimensions(KEY_WIDTH, ROW_HEIGHT)
  keyLabel.SetFont("ZoFontGameBold")
  keyLabel.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
  keyLabel.SetText(keyText)
  keyLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  keyLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

  const valueLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  valueLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, KEY_WIDTH, offsetY)
  valueLabel.SetDimensions(300, ROW_HEIGHT)
  valueLabel.SetFont("ZoFontGame")
  valueLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
  valueLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  valueLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

  return $multi(keyLabel, valueLabel, offsetY + ROW_HEIGHT + ROW_SPACING)
}

export function createCompanionPanel(parent: Control): Control {
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

  const [, nameValue, afterName] = createKeyValueRow(dataContainer, offsetY, "Name")
  offsetY = afterName

  const [levelKeyLabel, levelValue, afterLevel] = createKeyValueRow(dataContainer, offsetY, "Level")
  offsetY = afterLevel

  const [xpKeyLabel, xpValue, afterXp] = createKeyValueRow(dataContainer, offsetY, "Experience")
  offsetY = afterXp

  const [rapportKeyLabel, rapportLevelValue, afterRapport] = createKeyValueRow(
    dataContainer,
    offsetY,
    "Rapport"
  )
  offsetY = afterRapport

  const [rapportDescKeyLabel, rapportDescValue] = createKeyValueRow(dataContainer, offsetY, "")

  state = {
    panel,
    noCompanionLabel,
    dataContainer,
    nameValue,
    levelKeyLabel,
    levelValue,
    xpKeyLabel,
    xpValue,
    rapportKeyLabel,
    rapportLevelValue,
    rapportDescKeyLabel,
    rapportDescValue,
  }

  return panel
}

export function setLiveRowsVisible(visible: boolean): undefined {
  if (!state) return
  const hidden = !visible
  state.levelKeyLabel.SetHidden(hidden)
  state.levelValue.SetHidden(hidden)
  state.xpKeyLabel.SetHidden(hidden)
  state.xpValue.SetHidden(hidden)
  state.rapportKeyLabel.SetHidden(hidden)
  state.rapportLevelValue.SetHidden(hidden)
  state.rapportDescKeyLabel.SetHidden(hidden)
  state.rapportDescValue.SetHidden(hidden)
}

export function refreshCompanionPanel(): undefined {
  if (!state) return

  const selectedCompanionId = getSelectedCompanionId()

  if (selectedCompanionId === undefined) {
    state.noCompanionLabel.SetText("Select a companion from the dropdown")
    state.noCompanionLabel.SetHidden(false)
    state.dataContainer.SetHidden(true)
    return
  }

  if (isSelectedCompanionActive()) {
    state.noCompanionLabel.SetHidden(true)
    state.dataContainer.SetHidden(false)
    setLiveRowsVisible(true)

    const companionId = GetActiveCompanionDefId()
    const companionName = getCleanCompanionName(companionId)
    state.nameValue.SetText(companionName)

    const [level, currentXp] = GetActiveCompanionLevelInfo()
    state.levelValue.SetText(tostring(level))

    const maxXp = GetNumExperiencePointsInCompanionLevel(level)
    if (maxXp !== undefined && maxXp > 0) {
      state.xpValue.SetText(`${ZO_CommaDelimitNumber(currentXp)} / ${ZO_CommaDelimitNumber(maxXp)}`)
    } else {
      state.xpValue.SetText("Max Level")
    }

    const rapportLevel = GetActiveCompanionRapportLevel()
    const rapportDesc = GetActiveCompanionRapportLevelDescription(rapportLevel)
    state.rapportLevelValue.SetText(rapportDesc)
    state.rapportDescValue.SetText("")
    return
  }

  const saved = getSavedCompanionBuild(selectedCompanionId)
  if (saved) {
    state.noCompanionLabel.SetHidden(true)
    state.dataContainer.SetHidden(false)
    setLiveRowsVisible(false)

    const companionName = getCleanCompanionName(selectedCompanionId)
    state.nameValue.SetText(companionName)
    return
  }

  const companionName = getCleanCompanionName(selectedCompanionId)
  state.noCompanionLabel.SetText(`Summon ${companionName} to capture their build`)
  state.noCompanionLabel.SetHidden(false)
  state.dataContainer.SetHidden(true)
}
