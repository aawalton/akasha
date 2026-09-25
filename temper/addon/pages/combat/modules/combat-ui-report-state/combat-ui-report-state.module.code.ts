import {
  buildDataState,
  type DataState,
  type DataStateView,
} from "akasha/temper/window/modules/window-data-state/window-data-state.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

const COVERED = [
  "_MainPanel",
  "_RightPanel",
  "_UnitPanel",
  "_AbilityPanel",
  "_InfoPanel",
  "_InfoRow",
]

const NO_FIGHT = "No fight is recorded yet. Fight, then open the report."

const WORKING_OUT = "Working out the fight"

const NO_RECENT = "No fight this session."

const NO_SAVED = "No saved fight."

const REPORT_LEVEL = 1

const PANEL_LEVEL = 2

const SHOWN = 1

const UNSEEN = 0

let reportView: DataStateView | undefined

const COVERED_PANELS: Control[] = []

const LIST_VIEWS = new LuaTable<Control, DataStateView>()

export function buildReportState(report: Control, from: Control, to: Control): undefined {
  const area = WINDOW_MANAGER.CreateControl(undefined, report, CT_CONTROL)
  area.SetAnchor(TOPLEFT, from, BOTTOMLEFT, 0, 0)
  area.SetAnchor(BOTTOMRIGHT, to, BOTTOMRIGHT, 0, 0)
  reportView = buildDataState(area, { empty: NO_FIGHT, loading: WORKING_OUT, level: REPORT_LEVEL })
  for (const name of COVERED) {
    const panel = report.GetNamedChild(name)
    if (panel !== undefined) COVERED_PANELS.push(panel)
  }
  return undefined
}

export function showReportState(state: DataState): undefined {
  for (const panel of COVERED_PANELS) panel.SetAlpha(state === "loaded" ? SHOWN : UNSEEN)
  reportView?.show(state)
  return undefined
}

function listViewOf(panel: Control, saved: boolean): DataStateView | undefined {
  const held = LIST_VIEWS.get(panel)
  if (held !== undefined) return held
  const area = panel.GetNamedChild("Panel")
  if (area === undefined) return undefined
  const made = buildDataState(area, { empty: saved ? NO_SAVED : NO_RECENT, level: PANEL_LEVEL })
  LIST_VIEWS.set(panel, made)
  return made
}

export function showFightListState(panel: Control, saved: boolean, state: DataState): undefined {
  panel.GetNamedChild("LoadingLabel")?.SetHidden(true)
  listViewOf(panel, saved)?.show(state)
  return undefined
}
