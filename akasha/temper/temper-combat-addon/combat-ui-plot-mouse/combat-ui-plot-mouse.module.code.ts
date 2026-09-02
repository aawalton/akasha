import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { spairs } from "@akasha/temper-combat-addon/combat-sorted-pairs"
import { addTooltipLine, namedChild } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { drawAllPlots } from "@akasha/temper-combat-addon/combat-ui-plot"
import { PLOT_TYPE_XY } from "@akasha/temper-combat-addon/combat-ui-plot-draw"
import type { PlotWindowControl } from "@akasha/temper-combat-addon/combat-ui-plot-math"
import {
  getRequiredRange,
  limit,
  mapUIPosXY,
  updateScales,
  YAXIS_RIGHT,
} from "@akasha/temper-combat-addon/combat-ui-plot-math"

let START_X = 0
let START_Y = 0
let activePlotWindow: PlotWindowControl | undefined

function updateZoomControl(this: void): undefined {
  const plotWindow = assert(activePlotWindow)
  const zoomcontrol = namedChild(plotWindow, "Zoom")

  const [x2, y2] = GetUIMousePosition()

  const [minX, minY, maxX, maxY] = plotWindow.GetScreenRect()

  limit(x2, minX, maxX)
  limit(y2, minY, maxY)

  const width = zo_abs(x2 - START_X)
  const height = zo_abs(y2 - START_Y)

  zoomcontrol.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, zo_min(START_X, x2), zo_min(START_Y, y2))
  zoomcontrol.SetDimensions(width, height)
  return undefined
}

let oldx: number | undefined
let oldy: number | undefined

function updatePlotCursor(this: void): undefined {
  const plotWindow = assert(activePlotWindow)

  const [x, y] = GetUIMousePosition()

  if (x === oldx && y === oldy) {
    return undefined
  }

  oldx = x
  oldy = y

  const [cursorTime] = mapUIPosXY(plotWindow, x, y)

  const dataAtCursorTime: Record<number, [number, number | undefined]> = {}

  for (const plot of plotWindow.plots) {
    if (plot.plotType === PLOT_TYPE_XY && plot.XYData != null) {
      let coords: [number, number | undefined] = [0, 0]

      for (const data of plot.XYData) {
        const [t, rawV] = data

        if (t > cursorTime) {
          dataAtCursorTime[plot.id] = coords
          break
        }

        let v = rawV
        let percentV: number | undefined

        if (plot.YAxisSide === YAXIS_RIGHT) {
          percentV = v * 100

          v = v * assert(plot.AbsoluteYRange)
        }

        coords = [v, percentV]
      }
    }
  }

  InitializeTooltip(InformationTooltip, GuiRoot, TOPLEFT, x + 30, y + 30, TOPLEFT)

  let tooltipText = string.format(
    "|cddddddTime: %d:%02d",
    cursorTime / 60,
    zo_floor(cursorTime % 60)
  )

  addTooltipLine(plotWindow, InformationTooltip, tooltipText)

  for (const [plotId, data] of spairs(dataAtCursorTime)) {
    const color = assert(getDb().FightReport.PlotColors[plotId])
    const [r, g, b] = color

    const formatter = data[1] != null ? "|c%.2x%.2x%.2x%s: %d (%.1f%%)|r" : "|c%.2x%.2x%.2x%s: %d|r"

    const label = assert(plotWindow.plots[plotId - 1]).label

    tooltipText = string.format(
      formatter,
      zo_floor(r * 255),
      zo_floor(g * 255),
      zo_floor(b * 255),
      label,
      data[0],
      data[1]
    )

    addTooltipLine(plotWindow, InformationTooltip, tooltipText)
  }

  const cursor = namedChild(plotWindow, "Cursor")

  cursor.ClearAnchors()
  cursor.SetAnchor(TOPLEFT, plotWindow, TOPLEFT, x - plotWindow.GetLeft(), 0)
  cursor.SetAnchor(BOTTOMLEFT, plotWindow, BOTTOMLEFT, x - plotWindow.GetLeft(), 0)
  return undefined
}

export function onPlotMouseDown(
  this: void,
  plotWindowControl: PlotWindowControl,
  button: number
): undefined {
  if (button !== MOUSE_BUTTON_INDEX_LEFT) {
    return undefined
  }

  onPlotMouseExit(plotWindowControl)

  const zoomcontrol = namedChild(assert(activePlotWindow), "Zoom")

  const [x, y] = GetUIMousePosition()

  zoomcontrol.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, x, y)
  zoomcontrol.SetDimensions(0, 0)
  zoomcontrol.SetHidden(false)

  START_X = x
  START_Y = y

  activePlotWindow = plotWindowControl

  EVENT_MANAGER.RegisterForUpdate("TemperCombat_Report_Zoom_Control", 40, updateZoomControl)
  return undefined
}

export function onPlotMouseUp(
  this: void,
  plotWindow: PlotWindowControl,
  button: number,
  upInside: boolean
): undefined {
  if (button === MOUSE_BUTTON_INDEX_LEFT) {
    const [x, y] = GetUIMousePosition()

    EVENT_MANAGER.UnregisterForUpdate("TemperCombat_Report_Zoom_Control")
    const zoomcontrol = namedChild(plotWindow, "Zoom")
    zoomcontrol.SetHidden(true)

    if (x === START_X && y === START_Y) {
      onPlotMouseEnter(plotWindow)
      return undefined
    }

    const [t1, v1] = mapUIPosXY(plotWindow, START_X, START_Y)
    let [t2, v2] = mapUIPosXY(plotWindow, x, y)

    const [minT, maxT] = [plotWindow.RangesX[0], plotWindow.RangesX[1]]
    const [minV, maxV] = [plotWindow.RangesY[0], plotWindow.RangesY[1]]

    t2 = limit(t2, minT, maxT)
    v2 = limit(v2, minV, maxV)

    const tMin = zo_min(t1, t2)
    const tMax = zo_max(t1, t2)
    const vMin = zo_min(v1, v2)
    const vMax = zo_max(v1, v2)

    updateScales(plotWindow, [tMin, tMax, vMin, vMax])

    drawAllPlots(plotWindow)
  } else if (button === MOUSE_BUTTON_INDEX_RIGHT) {
    plotWindow.RangesX = [0, 0, []]
    plotWindow.RangesY = [0, 0, []]

    for (const plot of plotWindow.plots) {
      if (plot.XYData != null && plot.autoRange === true && plot.IsHidden() === false) {
        const [newRange] = getRequiredRange(plotWindow, assert(plot.range), true)

        updateScales(plotWindow, newRange)
      }
    }

    drawAllPlots(plotWindow)
  }

  if (upInside) {
    onPlotMouseEnter(plotWindow)
  }
  return undefined
}

export function onPlotMouseEnter(this: void, plotWindowControl: PlotWindowControl): undefined {
  activePlotWindow = plotWindowControl

  if (getDb().FightReport.Cursor) {
    const cursor = namedChild(activePlotWindow, "Cursor")
    cursor.SetHidden(false)

    EVENT_MANAGER.RegisterForUpdate("TemperCombat_Report_Cursor_Control", 40, updatePlotCursor)
  }
  return undefined
}

export function onPlotMouseExit(this: void, plotWindowControl: Control): undefined {
  EVENT_MANAGER.UnregisterForUpdate("TemperCombat_Report_Cursor_Control")
  ZO_Options_OnMouseExit(plotWindowControl)

  const cursor = namedChild(assert(activePlotWindow), "Cursor")
  cursor.SetHidden(true)
  return undefined
}

export function editLabelStart(this: void, label: LabelControl): undefined {
  const editbox = namedChild<EditControl>(assert(label.GetParent()), "Edit")

  label.SetHidden(true)
  editbox.SetHidden(false)

  editbox.SetText(label.GetText())
  editbox.SelectAll()
  editbox.TakeFocus()
  return undefined
}

export function editLabelEnd(this: void, editbox: EditControl): undefined {
  const tickControl = assert(editbox.GetParent())
  const plotWindow = assert(tickControl.GetParent<PlotWindowControl>())
  const label = namedChild<LabelControl>(tickControl, "Label")

  editbox.SetHidden(true)
  label.SetHidden(false)

  const newtext = tonumber(editbox.GetText())
  label.SetText(tostring(assert(newtext)))

  const t1 =
    tonumber(namedChild<LabelControl>(namedChild(plotWindow, "XTick1"), "Label").GetText()) ?? 0
  const t2 =
    tonumber(namedChild<LabelControl>(namedChild(plotWindow, "XTick5"), "Label").GetText()) ?? 0
  const v1 =
    tonumber(namedChild<LabelControl>(namedChild(plotWindow, "YTick1"), "Label").GetText()) ?? 0
  const v2 =
    tonumber(namedChild<LabelControl>(namedChild(plotWindow, "YTick5"), "Label").GetText()) ?? 0

  const tMin = zo_min(t1, t2)
  const tMax = zo_max(t1, t2)
  const vMin = zo_min(v1, v2)
  const vMax = zo_max(v1, v2)

  updateScales(plotWindow, [tMin, tMax, vMin, vMax], true)

  drawAllPlots(plotWindow)
  return undefined
}

TemperCombat.onPlotMouseDown = onPlotMouseDown
TemperCombat.onPlotMouseUp = onPlotMouseUp
TemperCombat.onPlotMouseEnter = onPlotMouseEnter
TemperCombat.onPlotMouseExit = onPlotMouseExit
TemperCombat.EditLabelStart = editLabelStart
TemperCombat.EditLabelEnd = editLabelEnd
