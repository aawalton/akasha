import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-interface-extra-2"
import "@akasha/temper-eso-types/eso-interface-extra-4"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-objects-02"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import type {
  AnyTemperFilter,
  FilterEditorOption,
  FilterRangeValue,
} from "@akasha/temper-items-filters-core/search-filter-types"
import type { FilterController } from "../panel-filter-binding/panel-filter-binding.module.code.ts"

export const COLOR_PRIMARY = [0.8442, 0.8442, 0.8442] as const
export const COLOR_SECONDARY = [0.6447, 0.6447, 0.6447] as const
export const COLOR_ACTIVE = [0.55, 0.78, 0.4] as const

export const PADDING_X = 10
export const PADDING_Y = 6
export const CONTROL_HEIGHT = 22
export const CONTROL_GAP = 6
export const LABEL_GAP = 4

export const NAME_BOX_WIDTH = 140
export const RANGE_BOX_WIDTH = 70
export const MULTISELECT_DROPDOWN_WIDTH = 120
export const TOGGLE_WIDTH = 70
export const CLEAR_WIDTH = 50

export interface BarButton {
  button: ButtonControl
  backdrop: BackdropControl
  label: LabelControl
}

export interface BarContext {
  tlw: TopLevelWindow
  controller: FilterController
  addReset: (this: void, reset: (this: void) => void) => void
  runResets: (this: void) => void
}

export function createFieldLabel(parent: Control, text: string, xOffset: number): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  label.SetAnchor(LEFT, parent, TOPLEFT, xOffset, PADDING_Y + CONTROL_HEIGHT / 2)
  label.SetFont("$(BOLD_FONT)|14|shadow")
  label.SetColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2], 1)
  label.SetText(text)
  return label
}

export function createBarButton(
  parent: Control,
  name: string,
  text: string,
  xOffset: number,
  width: number
): BarButton {
  const backdrop = WINDOW_MANAGER.CreateControl(`${name}BG`, parent, CT_BACKDROP)
  backdrop.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PADDING_Y)
  backdrop.SetDimensions(width, CONTROL_HEIGHT)
  backdrop.SetCenterColor(0, 0, 0, 0.6)
  backdrop.SetEdgeColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2], 0.6)
  backdrop.SetEdgeTexture(undefined, 1, 1, 1)

  const caption = WINDOW_MANAGER.CreateControl(`${name}Label`, backdrop, CT_LABEL)
  caption.SetAnchorFill()
  caption.SetFont("$(BOLD_FONT)|14|shadow")
  caption.SetColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2], 1)
  caption.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  caption.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  caption.SetText(text)
  caption.SetMouseEnabled(false)

  const button = WINDOW_MANAGER.CreateControl(name, parent, CT_BUTTON)
  button.SetAnchor(TOPLEFT, backdrop, TOPLEFT, 0, 0)
  button.SetAnchor(BOTTOMRIGHT, backdrop, BOTTOMRIGHT, 0, 0)
  button.SetMouseEnabled(true)

  const bar: BarButton = { button, backdrop, label: caption }
  setButtonActive(bar, false)
  return bar
}

export function createEditBox(
  parent: Control,
  name: string,
  xOffset: number,
  width: number,
  defaultText: string
): EditControl {
  const boxBg = WINDOW_MANAGER.CreateControl(`${name}BG`, parent, CT_BACKDROP)
  boxBg.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PADDING_Y)
  boxBg.SetDimensions(width, CONTROL_HEIGHT)
  boxBg.SetCenterColor(0, 0, 0, 0.6)
  boxBg.SetEdgeColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2], 0.6)
  boxBg.SetEdgeTexture(undefined, 1, 1, 1)

  const edit = WINDOW_MANAGER.CreateControl(name, parent, CT_EDITBOX)
  edit.SetAnchor(TOPLEFT, boxBg, TOPLEFT, 4, 0)
  edit.SetAnchor(BOTTOMRIGHT, boxBg, BOTTOMRIGHT, -4, 0)
  edit.SetFont("$(BOLD_FONT)|14|shadow")
  edit.SetColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2], 1)
  edit.SetDefaultText(defaultText)
  edit.SetMaxInputChars(64)
  edit.SetMouseEnabled(true)
  edit.SetHandler("OnMouseUp", function (this: void): undefined {
    edit.TakeFocus()
  })
  return edit
}

export function setButtonActive(bar: BarButton, active: boolean): undefined {
  if (active) {
    bar.backdrop.SetEdgeColor(COLOR_ACTIVE[0], COLOR_ACTIVE[1], COLOR_ACTIVE[2], 1)
  } else {
    bar.backdrop.SetEdgeColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2], 0.6)
  }
}

export function buildTextEditor(
  ctx: BarContext,
  filter: AnyTemperFilter,
  xOffset: number,
  parent: Control = ctx.tlw,
  width: number = NAME_BOX_WIDTH
): number {
  const editor = filter.editor
  const placeholder =
    editor.kind === "text" && editor.placeholder !== undefined ? editor.placeholder : "Search…"
  const safe = sanitizeName(filter.id)
  const edit = createEditBox(parent, `$(parent)Text_${safe}`, xOffset, width, placeholder)

  const controller = ctx.controller
  const id = filter.id
  edit.SetHandler("OnTextChanged", function (this: void): undefined {
    const text = edit.GetText()
    if (text.length === 0) {
      controller.clearFilter(id)
    } else {
      controller.setFilter(id, text)
    }
  })

  ctx.addReset(function (this: void): undefined {
    edit.SetText("")
  })

  return xOffset + width + CONTROL_GAP
}

const ALL_OPTION_LABEL = "All"

export function buildMultiselectEditor(
  ctx: BarContext,
  filter: AnyTemperFilter,
  options: readonly FilterEditorOption[],
  xOffset: number,
  parent: Control = ctx.tlw,
  width: number = MULTISELECT_DROPDOWN_WIDTH
): number {
  const safe = sanitizeName(filter.id)
  const container = WINDOW_MANAGER.CreateControlFromVirtual(
    `$(parent)Ms_${safe}`,
    parent,
    "ZO_ComboBox"
  )
  container.SetDimensions(width, CONTROL_HEIGHT)
  container.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PADDING_Y)

  const comboBox = ZO_ComboBox_ObjectFromContainer(container)
  const id = filter.id
  const cell: { syncing: boolean } = { syncing: false }

  const allEntry = comboBox.CreateItemEntry(ALL_OPTION_LABEL, function (this: void): undefined {
    if (cell.syncing) return
    ctx.controller.clearFilter(id)
  })
  comboBox.AddItem(allEntry)

  for (const option of options) {
    const value = option.value
    const entry = comboBox.CreateItemEntry(option.label, function (this: void): undefined {
      if (cell.syncing) return
      ctx.controller.setFilter(id, [value])
    })
    comboBox.AddItem(entry)
  }

  selectAllEntry(comboBox, cell)

  ctx.addReset(function (this: void): undefined {
    selectAllEntry(comboBox, cell)
  })

  return xOffset + width + CONTROL_GAP
}

function selectAllEntry(comboBox: ComboBox, cell: { syncing: boolean }): undefined {
  cell.syncing = true
  const items = comboBox.GetItems()
  for (const item of items) {
    if (item.name === ALL_OPTION_LABEL) {
      comboBox.SelectItem(item)
      break
    }
  }
  cell.syncing = false
}

export function buildToggleEditor(
  ctx: BarContext,
  filter: AnyTemperFilter,
  xOffset: number,
  parent: Control = ctx.tlw,
  width: number = TOGGLE_WIDTH
): number {
  const editor = filter.editor
  const includeLabel =
    editor.kind === "toggle" && editor.includeLabel !== undefined ? editor.includeLabel : "Yes"
  const excludeLabel =
    editor.kind === "toggle" && editor.excludeLabel !== undefined ? editor.excludeLabel : "No"

  const safe = sanitizeName(filter.id)
  const container = WINDOW_MANAGER.CreateControlFromVirtual(
    `$(parent)Tog_${safe}`,
    parent,
    "ZO_ComboBox"
  )
  container.SetDimensions(width, CONTROL_HEIGHT)
  container.SetAnchor(TOPLEFT, parent, TOPLEFT, xOffset, PADDING_Y)

  const comboBox = ZO_ComboBox_ObjectFromContainer(container)
  const id = filter.id
  const cell: { syncing: boolean } = { syncing: false }

  const allEntry = comboBox.CreateItemEntry(ALL_OPTION_LABEL, function (this: void): undefined {
    if (cell.syncing) return
    ctx.controller.clearFilter(id)
  })
  comboBox.AddItem(allEntry)

  const includeEntry = comboBox.CreateItemEntry(includeLabel, function (this: void): undefined {
    if (cell.syncing) return
    ctx.controller.setFilter(id, "include")
  })
  comboBox.AddItem(includeEntry)

  const excludeEntry = comboBox.CreateItemEntry(excludeLabel, function (this: void): undefined {
    if (cell.syncing) return
    ctx.controller.setFilter(id, "exclude")
  })
  comboBox.AddItem(excludeEntry)

  selectAllEntry(comboBox, cell)

  ctx.addReset(function (this: void): undefined {
    selectAllEntry(comboBox, cell)
  })

  return xOffset + width + CONTROL_GAP
}

export function buildRangeEditor(
  ctx: BarContext,
  filter: AnyTemperFilter,
  xOffset: number,
  parent: Control = ctx.tlw,
  width: number = RANGE_BOX_WIDTH
): number {
  const op = rangeOp(filter)
  const safe = sanitizeName(filter.id)
  const edit = createEditBox(parent, `$(parent)Range_${safe}`, xOffset, width, op)

  const controller = ctx.controller
  const id = filter.id
  edit.SetHandler("OnTextChanged", function (this: void): undefined {
    const text = edit.GetText()
    const parsed = parseNumber(text)
    if (parsed === undefined) {
      controller.clearFilter(id)
    } else {
      const value: FilterRangeValue = { value: parsed, op }
      controller.setFilter(id, value)
    }
  })

  ctx.addReset(function (this: void): undefined {
    edit.SetText("")
  })

  return xOffset + width + CONTROL_GAP
}

function rangeOp(filter: AnyTemperFilter): NonNullable<FilterRangeValue["op"]> {
  const editor = filter.editor
  if (editor.kind === "range" && editor.ops !== undefined) {
    const first = editor.ops[0]
    if (first !== undefined) {
      return first
    }
  }
  return "<="
}

function parseNumber(text: string): number | undefined {
  if (text.length === 0) return undefined
  const parsed = tonumber(text)
  if (parsed === undefined) return undefined
  return parsed
}

function sanitizeName(raw: string): string {
  const [result] = string.gsub(raw, "[^%w]", "_")
  return result
}
