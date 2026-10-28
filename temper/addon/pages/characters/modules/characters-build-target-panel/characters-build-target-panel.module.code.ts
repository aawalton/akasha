import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import { applyAttributeTarget } from "akasha/temper/addon/pages/characters/modules/characters-build-attributes/characters-build-attributes.module.code.ts"
import { applyChampionTarget } from "akasha/temper/addon/pages/characters/modules/characters-build-champion/characters-build-champion.module.code.ts"
import {
  checklistOf,
  currentCharacterTarget,
} from "akasha/temper/addon/pages/characters/modules/characters-build-checklist/characters-build-checklist.module.code.ts"
import { registerExternalTab } from "akasha/temper/addon/pages/characters/modules/characters-tab-manager/characters-tab-manager.module.code.ts"
import {
  colorOf,
  colorText,
  styleText,
  textColorOf,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { buildButton } from "akasha/temper/window/modules/window-controls/window-controls.module.code.ts"
import {
  LINE_HEIGHT,
  ROW_PADDING_X,
} from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"

const LINES_SHOWN = 40

const SECTION_GAP = 8

const HEADER_GAP = 12

const REFRESH_AFTER_APPLY_MS = 1500

const NO_TARGET = "This character has no target build."

const APPLY_TEXT = "Apply champion points and attributes"

interface TargetPanel {
  readonly title: LabelControl
  readonly apply: ButtonControl
  readonly said: LabelControl
  readonly lines: readonly LabelControl[]
  readonly top: number
}

let held: TargetPanel | undefined

function lineLabel(panel: Control): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
  label.SetHeight(LINE_HEIGHT)
  label.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  label.SetHidden(true)
  return label
}

function applyTarget(): undefined {
  if (held === undefined) return undefined
  const target = currentCharacterTarget()
  if (target === undefined) return undefined
  const said = [applyChampionTarget(target), applyAttributeTarget(target.attributes)]
  held.said.SetText(said.join("  "))
  zo_callLater(refreshTargetPanel, REFRESH_AFTER_APPLY_MS)
  return undefined
}

export function createTargetPanel(parent: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  panel.SetAnchorFill()
  panel.SetHidden(true)

  const title = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
  title.SetAnchor(TOPLEFT, panel, TOPLEFT, ROW_PADDING_X, 0)
  styleText(title, "heading")

  const apply = buildButton(panel, undefined, APPLY_TEXT, "default")
  apply.SetAnchor(TOPLEFT, title, BOTTOMLEFT, 0, HEADER_GAP)
  apply.SetHandler("OnClicked", applyTarget)

  const said = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
  said.SetAnchor(LEFT, apply, RIGHT, HEADER_GAP, 0)
  styleText(said, "muted")

  const lines: LabelControl[] = []
  for (let at = 0; at < LINES_SHOWN; at++) lines.push(lineLabel(panel))

  held = { title, apply, said, lines, top: title.GetHeight() + HEADER_GAP * 2 + apply.GetHeight() }
  return panel
}

function place(label: LabelControl, panel: TargetPanel, top: number, indent: number): undefined {
  label.ClearAnchors()
  label.SetAnchor(TOPLEFT, panel.title, TOPLEFT, indent, top)
  label.SetHidden(false)
  return undefined
}

export function refreshTargetPanel(this: void): undefined {
  if (held === undefined) return undefined
  const panel = held
  for (const line of panel.lines) line.SetHidden(true)
  const target = currentCharacterTarget()
  panel.apply.SetHidden(target === undefined)
  if (target === undefined) {
    panel.title.SetText(NO_TARGET)
    panel.said.SetText("")
    return undefined
  }
  panel.title.SetText(`Target: ${target.title}`)
  let used = 0
  let top = panel.top
  for (const section of checklistOf(target)) {
    const heading = panel.lines[used]
    if (heading === undefined) break
    used++
    const met = section.lines.filter((line) => line.met).length
    heading.SetText(`${section.title}  ${met} of ${section.lines.length}`)
    styleText(heading, "label")
    place(heading, panel, top, 0)
    top += LINE_HEIGHT
    for (const line of section.lines) {
      if (line.met) continue
      const label = panel.lines[used]
      if (label === undefined) break
      used++
      label.SetText(line.text)
      styleText(label, "body")
      colorText(label, textColorOf(INTERFACE_TEXT_COLOR_FAILED))
      place(label, panel, top, ROW_PADDING_X * 2)
      top += LINE_HEIGHT
    }
    if (met === section.lines.length)
      colorText(heading, textColorOf(INTERFACE_TEXT_COLOR_SUCCEEDED))
    else colorText(heading, colorOf("strong"))
    top += SECTION_GAP
  }
  return undefined
}

export function registerTargetBuildTab(): undefined {
  registerExternalTab(
    {
      id: "target",
      title: "Target Build",
      subTabs: [{ id: "target-checklist", title: "Checklist" }],
    },
    { "target-checklist": createTargetPanel },
    { "target-checklist": refreshTargetPanel }
  )
  return undefined
}
