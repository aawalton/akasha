import type { SelectedBuff } from "@akasha/temper-combat-addon/combat-core-types"
import { getFormattedAbilityIcon } from "@akasha/temper-combat-addon/combat-lib-constants"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { spairs } from "@akasha/temper-combat-addon/combat-sorted-pairs"
import { buffSortFunction, getBuffData } from "@akasha/temper-combat-addon/combat-ui-buff-panel"
import type { TooltipCarrier } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { namedChild } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { acquireBuffData } from "@akasha/temper-combat-addon/combat-ui-plot-buffs"
import { drawPlot, PLOT_TYPE_BAR } from "@akasha/temper-combat-addon/combat-ui-plot-draw"
import type {
  PlotControl,
  PlotData,
  PlotWindowControl,
} from "@akasha/temper-combat-addon/combat-ui-plot-math"
import {
  acquireRange,
  getRequiredRange,
  MAX_BAR_PLOTS,
  updateScales,
  YAXIS_RIGHT,
} from "@akasha/temper-combat-addon/combat-ui-plot-math"
import { getFightData, getSelections } from "@akasha/temper-combat-addon/combat-ui-state"

export interface SelectorControl extends Control {
  id: number
  color?: [number, number, number, number]
}

let ENLARGED_GRAPH = false

export function updatePlot(plot: PlotControl): undefined {
  if (plot.plotType === PLOT_TYPE_BAR) {
    updateBarPlot(plot)
  } else {
    updateXYPlot(plot)
  }
  return undefined
}

export function drawAllPlots(plotWindow: PlotWindowControl): undefined {
  for (const plot of plotWindow.plots) {
    drawPlot(plot)
  }
  return undefined
}

export function updateXYPlot(plot: PlotControl): undefined {
  const func = plot.func

  let result: PlotData | undefined

  if (func != null) {
    result = func()
    plot.AbsoluteYRange = result != null ? result.absoluteYRange : undefined
  }

  if (result == null) {
    plot.SetHidden(true)

    return undefined
  }

  plot.SetHidden(false)

  const xyData = result.xyData
  const yAxisSide = result.yAxisSide

  const range = acquireRange(xyData)

  if (yAxisSide === YAXIS_RIGHT) {
    range[2] = 0
    range[3] = 1
  }

  const plotWindow = assert(plot.GetParent<PlotWindowControl>())

  if (plot.autoRange === true) {
    const [newRange, isChanged] = getRequiredRange(plotWindow, range, true)

    if (isChanged) {
      updateScales(plotWindow, newRange)
    }
  }

  plot.range = range

  plot.XYData = xyData
  plot.YAxisSide = yAxisSide
  return undefined
}

let PLOT_BUFF_SELECTION: string[] = []

export function updatePlotBuffSelection(): undefined {
  PLOT_BUFF_SELECTION = []

  const selectedbuffs = getSelections().buff["buff"]

  const buffData = getBuffData()

  if (buffData == null || buffData.buffs == null) {
    return undefined
  }

  for (const [buffName] of spairs(buffData.buffs, buffSortFunction)) {
    if (selectedbuffs != null && selectedbuffs[buffName] !== undefined) {
      PLOT_BUFF_SELECTION[PLOT_BUFF_SELECTION.length] = buffName
    }

    if (PLOT_BUFF_SELECTION.length >= MAX_BAR_PLOTS) {
      return undefined
    }
  }
  return undefined
}

export function updateBarPlot(plot: PlotControl): undefined {
  const barId = plot.barId ?? 0

  const buffName = PLOT_BUFF_SELECTION[barId - 1]
  const buffData = getBuffData()

  if (buffName == null) {
    plot.SetHidden(true)

    return undefined
  }

  const data: SelectedBuff = assert(buffData?.buffs?.[buffName])

  const bardata = acquireBuffData(buffName)

  plot.SetHidden(false)

  const plotWindow = assert(plot.GetParent<PlotWindowControl>())

  const plotheight = plotWindow.GetHeight()

  const totalSlots = PLOT_BUFF_SELECTION.length > 4 ? 8 : 4

  const position = (plotheight * (barId - 0.5)) / totalSlots

  const scale = getDb().FightReport.scale
  const xoffset = scale * 24

  plot.SetAnchor(LEFT, plotWindow, TOPLEFT, -xoffset, position)
  plot.SetAnchor(RIGHT, plotWindow, TOPRIGHT, 0, position)
  plot.SetHeight(scale * 20)

  const icon = namedChild<TextureControl & TooltipCarrier>(plot, "Icon")

  icon.SetTexture(getFormattedAbilityIcon(data.iconId))
  icon.tooltip = [buffName]

  plot.bardata = bardata
  plot.xoffset = xoffset
  plot.effectType = data.effectType

  drawPlot(plot)
  return undefined
}

export function updateGraphPanel(panel: Control): undefined {
  if (panel.IsHidden()) {
    return undefined
  }

  if (ENLARGED_GRAPH === true) {
    panel.SetParent(TemperCombat_Report)
    panel.SetAnchor(BOTTOMRIGHT, TemperCombat_Report_InfoPanel, BOTTOMRIGHT, 0, 0)
  } else {
    panel.SetParent(TemperCombat_Report_MainPanel)
    panel.SetAnchor(BOTTOMRIGHT, TemperCombat_Report_MainPanel, BOTTOMRIGHT, 0, 0)
  }

  namedChild(TemperCombat_Report, "_AbilityPanel").SetHidden(ENLARGED_GRAPH)
  namedChild(TemperCombat_Report, "_UnitPanel").SetHidden(ENLARGED_GRAPH)
  namedChild(TemperCombat_Report, "_RightPanel").SetHidden(ENLARGED_GRAPH)
  namedChild(TemperCombat_Report, "_MainPanel").SetHidden(ENLARGED_GRAPH)

  const plotWindow = namedChild<PlotWindowControl>(panel, "PlotWindow")
  const toolbar = namedChild(panel, "Toolbar")
  const smoothSlider = namedChild<SliderControl & Control>(
    namedChild(toolbar, "SmoothControl"),
    "Slider"
  )

  const db = getDb()

  smoothSlider.SetValue(db.FightReport.SmoothWindow)

  const groupSelector = namedChild(namedChild(toolbar, "BuffSelector1"), "GroupSelector")
  groupSelector.SetHidden(db.FightReport.rightpanel !== "buffsout")

  if (getFightData() == null) {
    plotWindow.SetHidden(true)
    return undefined
  }

  plotWindow.SetHidden(false)
  plotWindow.RangesX = [0, 0, []]
  plotWindow.RangesY = [0, 0, []]

  updatePlotBuffSelection()

  for (const plot of plotWindow.plots) {
    updatePlot(plot)
  }

  drawAllPlots(plotWindow)
  return undefined
}

export function setSliderValue(this: void, slider: Control, value: number): undefined {
  const labelControl = namedChild<LabelControl>(assert(slider.GetParent()), "Label")

  labelControl.SetText(string.format(GetString(SI_TEMPER_COMBAT_SMOOTH_LABEL), value))

  getDb().FightReport.SmoothWindow = value

  const graphPanel = assert(assert(assert(slider.GetParent()).GetParent()).GetParent())

  updateGraphPanel(graphPanel)
  return undefined
}

let lastPlotSelector: Control | undefined

export function setLastPlotSelector(selector: Control): undefined {
  lastPlotSelector = selector
  return undefined
}

export function getLastPlotSelector(): Control | undefined {
  return lastPlotSelector
}

export function removePlotSelection(this: void): undefined {
  const selector = assert(lastPlotSelector)

  const control = assert(selector.GetParent<SelectorControl>())
  const id = control.id

  const label = namedChild<LabelControl>(control, "Label")
  label.SetText("-")

  const plotwindow = namedChild<PlotWindowControl>(
    assert(assert(control.GetParent()).GetParent()),
    "PlotWindow"
  )

  const plot = assert(plotwindow.plots[id - 1])

  plot.func = undefined

  updatePlot(plot)
  return undefined
}

export function toggleGraphSize(this: void, control: Control): undefined {
  ENLARGED_GRAPH = !ENLARGED_GRAPH

  const labelText = ENLARGED_GRAPH
    ? GetString(SI_TEMPER_COMBAT_SHRINK)
    : GetString(SI_TEMPER_COMBAT_ENLARGE)

  namedChild<LabelControl>(control, "Label").SetText(labelText)

  const graphPanel = assert(assert(control.GetParent()).GetParent())
  updateGraphPanel(graphPanel)
  return undefined
}

export function toggleCursorDisplay(this: void, control: Control): undefined {
  const enable = !getDb().FightReport.Cursor

  control.SetAlpha(enable ? 1 : 0.3)

  getDb().FightReport.Cursor = enable
  return undefined
}

TemperCombat.SetSliderValue = setSliderValue
TemperCombat.ToggleGraphSize = toggleGraphSize
TemperCombat.ToggleCursorDisplay = toggleCursorDisplay
