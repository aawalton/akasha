import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import {
  createCompanionDropdown,
  DROPDOWN_BOTTOM_MARGIN,
  DROPDOWN_HEIGHT,
  getCleanCompanionName,
  getSavedCompanionBuild,
  getSelectedCompanionId,
  isSelectedCompanionActive,
} from "akasha/temper/addon/pages/characters/modules/companions-selector/companions-selector.module.code.ts"
import { styleText } from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import {
  buildDataState,
  type DataStateView,
} from "akasha/temper/window/modules/window-data-state/window-data-state.module.code.ts"
import { formatCount } from "akasha/temper/window/modules/window-numbers/window-numbers.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

const ROW_HEIGHT = 28
const ROW_SPACING = 4
const KEY_WIDTH = 120
const WINDOW_LEVEL = 1
const CHOOSE_COMPANION = "Choose a companion above."

interface CompanionPanelState {
  panel: Control
  emptyState: DataStateView
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

let state: CompanionPanelState | undefined

function createKeyValueRow(
  parent: Control,
  offsetY: number,
  keyText: string
): LuaMultiReturn<[LabelControl, LabelControl, number]> {
  const keyLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  keyLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, 0, offsetY)
  keyLabel.SetDimensions(KEY_WIDTH, ROW_HEIGHT)
  styleText(keyLabel, "label")
  keyLabel.SetText(keyText)
  keyLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  keyLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

  const valueLabel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  valueLabel.SetAnchor(TOPLEFT, parent, TOPLEFT, KEY_WIDTH, offsetY)
  valueLabel.SetDimensions(300, ROW_HEIGHT)
  styleText(valueLabel, "body")
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

  const emptyArea = WINDOW_MANAGER.CreateControl(undefined, panel, CT_CONTROL)
  emptyArea.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, contentTop)
  emptyArea.SetAnchor(BOTTOMRIGHT, panel, BOTTOMRIGHT, 0, 0)
  const emptyState = buildDataState(emptyArea, { empty: CHOOSE_COMPANION, level: WINDOW_LEVEL })

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
    emptyState,
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

function setLiveRowsVisible(visible: boolean): undefined {
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
    state.emptyState.show("empty")
    state.dataContainer.SetHidden(true)
    return
  }

  if (isSelectedCompanionActive()) {
    state.emptyState.show("loaded")
    state.dataContainer.SetHidden(false)
    setLiveRowsVisible(true)

    const companionId = GetActiveCompanionDefId()
    const companionName = getCleanCompanionName(companionId)
    state.nameValue.SetText(companionName)

    const [level, currentXp] = GetActiveCompanionLevelInfo()
    state.levelValue.SetText(formatCount(level))

    const maxXp = GetNumExperiencePointsInCompanionLevel(level)
    if (maxXp !== undefined && maxXp > 0) {
      state.xpValue.SetText(`${formatCount(currentXp)} / ${formatCount(maxXp)}`)
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
    state.emptyState.show("loaded")
    state.dataContainer.SetHidden(false)
    setLiveRowsVisible(false)

    const companionName = getCleanCompanionName(selectedCompanionId)
    state.nameValue.SetText(companionName)
    return
  }

  const companionName = getCleanCompanionName(selectedCompanionId)
  state.emptyState.show("empty", `Summon ${companionName} to capture their build.`)
  state.dataContainer.SetHidden(true)
}
