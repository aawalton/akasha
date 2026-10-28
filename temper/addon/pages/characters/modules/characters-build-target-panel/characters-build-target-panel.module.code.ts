import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import { applyAttributeTarget } from "akasha/temper/addon/pages/characters/modules/characters-build-attributes/characters-build-attributes.module.code.ts"
import {
  applyBarTarget,
  whenBarsSaid,
} from "akasha/temper/addon/pages/characters/modules/characters-build-bars/characters-build-bars.module.code.ts"
import { applyChampionTarget } from "akasha/temper/addon/pages/characters/modules/characters-build-champion/characters-build-champion.module.code.ts"
import {
  type ChecklistSection,
  checklistOf,
  currentCharacterTarget,
} from "akasha/temper/addon/pages/characters/modules/characters-build-checklist/characters-build-checklist.module.code.ts"
import { applyGearTarget } from "akasha/temper/addon/pages/characters/modules/characters-build-gear/characters-build-gear.module.code.ts"
import {
  drawPanelBackground,
  PANEL_GAP,
} from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import type { CharacterTarget } from "akasha/temper/player/character/build/modules/character-target-types/character-target-types.module.code.ts"
import {
  colorOf,
  colorText,
  styleText,
  textColorOf,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import {
  buildButton,
  setButtonText,
} from "akasha/temper/window/modules/window-controls/window-controls.module.code.ts"
import { LINE_HEIGHT } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"

const PANEL_NAME = "TemperCharactersTargetBuild"

const BESIDE_NAME = "ZO_StatsPanel"

const LINES_SHOWN = 40

const PADDING = 16

const INDENT = 16

const SECTION_GAP = 8

const HEADER_GAP = 12

const MIN_WIDTH = 250

const SAID_WIDTH = 420

const REFRESH_AFTER_APPLY_MS = 1500

const UPDATES_NAME = `${PANEL_NAME}Updates`

const APPLIERS: Readonly<Record<string, (target: CharacterTarget) => string>> = {
  Attributes: (target) => applyAttributeTarget(target.attributes),
  "Champion points": applyChampionTarget,
  "Skill bars": applyBarTarget,
  Gear: applyGearTarget,
}

function toApply(sections: readonly ChecklistSection[]): readonly string[] {
  return sections
    .filter((section) => APPLIERS[section.title] !== undefined)
    .filter((section) => section.lines.some((line) => !line.met))
    .map((section) => section.title)
}

function applyText(titles: readonly string[]): string {
  const named = titles.map((title) => string.lower(title))
  const last = named.pop()
  return named.length === 0 ? `Apply ${last}` : `Apply ${named.join(", ")} and ${last}`
}

interface TargetPanel {
  readonly window: TopLevelWindow
  readonly title: LabelControl
  readonly apply: ButtonControl
  readonly said: LabelControl
  readonly lines: readonly LabelControl[]
}

let held: TargetPanel | undefined

function lineLabel(window: Control): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(undefined, window, CT_LABEL)
  label.SetHeight(LINE_HEIGHT)
  label.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  label.SetHidden(true)
  return label
}

function applyTarget(): undefined {
  if (held === undefined) return undefined
  const target = currentCharacterTarget()
  if (target === undefined) return undefined
  const said: string[] = []
  for (const title of toApply(checklistOf(target))) said.push(APPLIERS[title]?.(target) ?? "")
  held.said.SetText(said.join("\n"))
  zo_callLater(refreshTargetPanel, REFRESH_AFTER_APPLY_MS)
  return undefined
}

function createTargetPanel(): TargetPanel {
  const window = WINDOW_MANAGER.CreateTopLevelWindow(PANEL_NAME)
  window.SetHidden(true)
  drawPanelBackground(window)

  const title = WINDOW_MANAGER.CreateControl("$(parent)Title", window, CT_LABEL)
  styleText(title, "heading")

  const apply = buildButton(window, undefined, "Apply", "default")
  apply.SetHandler("OnClicked", applyTarget)

  const said = WINDOW_MANAGER.CreateControl(undefined, window, CT_LABEL)
  styleText(said, "muted")
  said.SetWidth(SAID_WIDTH)
  said.SetHidden(true)

  const lines: LabelControl[] = []
  for (let at = 0; at < LINES_SHOWN; at++) lines.push(lineLabel(window))

  return { window, title, apply, said, lines }
}

function placeAt(control: Control, panel: TargetPanel, top: number, indent: number): number {
  control.ClearAnchors()
  control.SetAnchor(TOPLEFT, panel.window, TOPLEFT, PADDING + indent, top)
  control.SetHidden(false)
  return top + control.GetHeight()
}

function placeBeside(window: TopLevelWindow): undefined {
  window.ClearAnchors()
  const beside = WINDOW_MANAGER.GetControlByName(BESIDE_NAME)
  if (beside === undefined) window.SetAnchor(TOPRIGHT, GuiRoot, TOPRIGHT, -PANEL_GAP, PANEL_GAP)
  else window.SetAnchor(TOPRIGHT, beside, TOPLEFT, -PANEL_GAP, 0)
  return undefined
}

function showHeading(label: LabelControl, title: string, met: number, total: number): undefined {
  styleText(label, "label")
  label.SetText(`${title}  ${met} of ${total}`)
  if (met === total) colorText(label, textColorOf(INTERFACE_TEXT_COLOR_SUCCEEDED))
  else colorText(label, colorOf("strong"))
  return undefined
}

function showUnmet(label: LabelControl, text: string): undefined {
  styleText(label, "body")
  label.SetText(text)
  colorText(label, textColorOf(INTERFACE_TEXT_COLOR_FAILED))
  return undefined
}

export function refreshTargetPanel(this: void): undefined {
  if (held === undefined) return undefined
  const panel = held
  for (const line of panel.lines) line.SetHidden(true)
  const target = currentCharacterTarget()
  if (target === undefined) {
    panel.window.SetHidden(true)
    return undefined
  }
  panel.title.SetText(`Target Build — ${target.title}`)
  const sections = checklistOf(target)
  const applying = toApply(sections)
  let widest = math.max(MIN_WIDTH, panel.title.GetTextWidth())
  let top = placeAt(panel.title, panel, PADDING, 0) + HEADER_GAP
  panel.apply.SetHidden(applying.length === 0)
  if (applying.length > 0) {
    setButtonText(panel.apply, applyText(applying))
    widest = math.max(widest, panel.apply.GetWidth())
    top = placeAt(panel.apply, panel, top, 0) + HEADER_GAP
  }
  if (panel.said.GetText() !== "") {
    placeAt(panel.said, panel, top, 0)
    top += math.max(panel.said.GetHeight(), panel.said.GetTextHeight()) + HEADER_GAP
    widest = math.max(widest, SAID_WIDTH)
  }
  let used = 0
  for (const section of sections) {
    const label = panel.lines[used]
    if (label === undefined) break
    used++
    const met = section.lines.filter((line) => line.met).length
    showHeading(label, section.title, met, section.lines.length)
    top = placeAt(label, panel, top, 0)
    widest = math.max(widest, label.GetTextWidth())
    for (const line of section.lines) {
      if (line.met) continue
      const row = panel.lines[used]
      if (row === undefined) break
      used++
      showUnmet(row, line.text)
      top = placeAt(row, panel, top, INDENT)
      widest = math.max(widest, row.GetTextWidth() + INDENT)
    }
    top += SECTION_GAP
  }
  panel.window.SetDimensions(widest + PADDING * 2, top - SECTION_GAP + PADDING)
  placeBeside(panel.window)
  panel.window.SetHidden(!STATS_SCENE.IsShowing())
  return undefined
}

export function initializeTargetBuildPanel(): undefined {
  if (held !== undefined) return undefined
  const panel = createTargetPanel()
  held = panel
  STATS_SCENE.RegisterCallback("StateChange", (_oldState, newState) => {
    if (newState === SCENE_HIDDEN) {
      panel.window.SetHidden(true)
      return
    }
    if (newState === SCENE_SHOWING) refreshTargetPanel()
  })
  const refreshShown = (): undefined => {
    if (!panel.window.IsHidden()) refreshTargetPanel()
    return undefined
  }
  whenBarsSaid((text) => {
    panel.said.SetText(text)
    return refreshShown()
  })
  EVENT_MANAGER.RegisterForEvent(UPDATES_NAME, EVENT_INVENTORY_SINGLE_SLOT_UPDATE, refreshShown)
  EVENT_MANAGER.RegisterForEvent(`${UPDATES_NAME}Bars`, EVENT_HOTBAR_SLOT_UPDATED, refreshShown)
  return undefined
}
