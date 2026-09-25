import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { ALL_COMPANION_IDS } from "akasha/temper/addon/pages/characters/modules/companions-id-map/companions-id-map.module.code.ts"
import { getCleanCompanionName } from "akasha/temper/addon/pages/characters/modules/companions-selector/companions-selector.module.code.ts"
import { styleText } from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import {
  drawPanel,
  HEADER_ROW_HEIGHT,
  ROW_PADDING_X,
  STAT_ROW_HEIGHT,
} from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"

const SUMMARY_ROW_HEIGHT = STAT_ROW_HEIGHT
const SUMMARY_COL_NAME = ROW_PADDING_X
const SUMMARY_COL_NAME_WIDTH = 140
const SUMMARY_COL_EQUIP = SUMMARY_COL_NAME + 140
const SUMMARY_COL_EQUIP_WIDTH = 80
const SUMMARY_COL_UPGRADE = SUMMARY_COL_NAME + 220
const SUMMARY_COL_UPGRADE_WIDTH = 50
const SUMMARY_COL_SKILLS = SUMMARY_COL_NAME + 270
const SUMMARY_COL_SKILLS_WIDTH = 80
const SUMMARY_COL_BUILD = SUMMARY_COL_NAME + 350
const SUMMARY_COL_BUILD_WIDTH = 60
const SUMMARY_COL_APPLY = SUMMARY_COL_NAME + 410
const SUMMARY_COL_APPLY_WIDTH = 60
const SUMMARY_TABLE_WIDTH = SUMMARY_COL_APPLY + SUMMARY_COL_APPLY_WIDTH + ROW_PADDING_X

export interface SummaryRow {
  nameLabel: LabelControl
  equipLabel: LabelControl
  upgradeLabel: LabelControl
  skillsLabel: LabelControl
  buildLabel: LabelControl
  applyLabel: LabelControl
}

interface SummaryPanelState {
  panel: Control
  rows: SummaryRow[]
  companionIds: number[]
}

export let summaryState: SummaryPanelState | undefined

export function createCompanionSummaryPanel(parent: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  panel.SetAnchorFill()
  panel.SetHidden(true)

  const table = WINDOW_MANAGER.CreateControl(undefined, panel, CT_CONTROL)
  table.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, 0)
  table.SetWidth(SUMMARY_TABLE_WIDTH)
  drawPanel(panel, undefined, table, table)

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
    label.SetDimensions(h.width, HEADER_ROW_HEIGHT)
    styleText(label, "label")
    label.SetText(h.text)
    label.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    label.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  }

  offsetY = offsetY + HEADER_ROW_HEIGHT

  const rows: SummaryRow[] = []
  const companionIds = ALL_COMPANION_IDS

  for (const companionId of companionIds) {
    const nameLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    nameLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_NAME, offsetY)
    nameLabel.SetDimensions(SUMMARY_COL_NAME_WIDTH, SUMMARY_ROW_HEIGHT)
    styleText(nameLabel, "body")
    nameLabel.SetText(getCleanCompanionName(companionId))
    nameLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    nameLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)

    const equipLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    equipLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_EQUIP, offsetY)
    equipLabel.SetDimensions(SUMMARY_COL_EQUIP_WIDTH, SUMMARY_ROW_HEIGHT)
    styleText(equipLabel, "hint")
    equipLabel.SetText("-")
    equipLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    equipLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
    equipLabel.SetMouseEnabled(true)

    const upgradeLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    upgradeLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_UPGRADE, offsetY)
    upgradeLabel.SetDimensions(SUMMARY_COL_UPGRADE_WIDTH, SUMMARY_ROW_HEIGHT)
    styleText(upgradeLabel, "hint")
    upgradeLabel.SetText("-")
    upgradeLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    upgradeLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
    upgradeLabel.SetMouseEnabled(true)

    const skillsLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    skillsLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_SKILLS, offsetY)
    skillsLabel.SetDimensions(SUMMARY_COL_SKILLS_WIDTH, SUMMARY_ROW_HEIGHT)
    styleText(skillsLabel, "hint")
    skillsLabel.SetText("-")
    skillsLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    skillsLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)

    const buildLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    buildLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_BUILD, offsetY)
    buildLabel.SetDimensions(SUMMARY_COL_BUILD_WIDTH, SUMMARY_ROW_HEIGHT)
    styleText(buildLabel, "hint")
    buildLabel.SetText("-")
    buildLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    buildLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)

    const applyLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    applyLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_APPLY, offsetY)
    applyLabel.SetDimensions(SUMMARY_COL_APPLY_WIDTH, SUMMARY_ROW_HEIGHT)
    styleText(applyLabel, "hint")
    applyLabel.SetText("")
    applyLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    applyLabel.SetVerticalAlignment(TEXT_ALIGN_CENTER)
    applyLabel.SetMouseEnabled(true)

    rows.push({ nameLabel, equipLabel, upgradeLabel, skillsLabel, buildLabel, applyLabel })
    offsetY = offsetY + SUMMARY_ROW_HEIGHT
  }

  table.SetHeight(offsetY)

  summaryState = { panel, rows, companionIds }
  return panel
}
