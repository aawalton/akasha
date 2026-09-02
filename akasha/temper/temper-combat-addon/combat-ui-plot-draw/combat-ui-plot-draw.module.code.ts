import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import type {
  PlotControl,
  PlotWindowControl,
} from "@akasha/temper-combat-addon/combat-ui-plot-math"
import {
  mapValue,
  mapValueXY,
  PLOT_DIMENSION_X,
  YAXIS_RIGHT,
} from "@akasha/temper-combat-addon/combat-ui-plot-math"
import { getDx } from "@akasha/temper-combat-addon/combat-ui-state"

export const PLOT_TYPE_XY = 1
export const PLOT_TYPE_BAR = 2

export const PLOT_TYPE_TEMPLATES: Record<typeof PLOT_TYPE_XY | typeof PLOT_TYPE_BAR, string> = {
  [PLOT_TYPE_XY]: "TemperCombat_PlotControlXY",
  [PLOT_TYPE_BAR]: "TemperCombat_PlotControlBar",
}

export type LineCoords = [
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  inRange1: boolean,
  inRange2: boolean,
]

function drawLine(plot: PlotControl, coords: LineCoords, id: number): undefined {
  const plotid = plot.id
  const lineControls = plot.lineControls ?? []
  plot.lineControls = lineControls

  let line = lineControls[id - 1]

  if (line == null) {
    line = CreateControlFromVirtual<LineControl & Control>(
      "$(parent)Line",
      plot,
      "TemperCombat_PlotLine",
      id
    )
    lineControls[id - 1] = line
  }

  line.SetThickness(getDx() * 16)
  const lineColor = assert(getDb().FightReport.PlotColors[plotid])
  line.SetColor(lineColor[0], lineColor[1], lineColor[2], lineColor[3])
  line.ClearAnchors()

  let [x1, y1, x2, y2] = coords
  const [, , , , inRange1, inRange2] = coords

  const minX = 0
  const minY = 0

  const [maxX, maxY] = plot.GetDimensions()

  const outOfRange =
    (x1 < minX && x2 < minX) ||
    (x1 > maxX && x2 > maxX) ||
    (y1 < minY && y2 < minY) ||
    (y1 > maxY && y2 > maxY)

  if (outOfRange) {
    line.SetHidden(false)
    return undefined
  } else if (!(inRange1 && inRange2)) {
    const m = (y2 - y1) / (x2 - x1)
    const n = y1 - m * x1

    if (y1 > maxY) {
      x1 = m === 0 ? x1 : (maxY - n) / m
      y1 = maxY
    } else if (y1 < minY) {
      x1 = m === 0 ? x1 : (minY - n) / m
      y1 = minY
    }

    if (y2 > maxY) {
      x2 = m === 0 ? x2 : (maxY - n) / m
      y2 = maxY
    } else if (y2 < minY) {
      x2 = m === 0 ? x2 : (minY - n) / m
      y2 = minY
    }

    if (x1 < minX) {
      x1 = minX
      y1 = m * minX + n
    }

    if (x2 > maxX) {
      x2 = maxX
      y2 = m * maxX + n
    }
  }

  const inRange = y1 >= minY && y1 <= maxY && y2 >= minY && y2 <= maxY && x2 >= minX && x1 <= maxX

  if (!inRange) {
    line.SetHidden(false)
    return undefined
  }

  let side1 = BOTTOMLEFT
  let side2 = TOPRIGHT

  if (y1 > y2) {
    side1 = TOPLEFT
    side2 = BOTTOMRIGHT
  }

  line.SetAnchor(side1, plot, BOTTOMLEFT, x1, -y1)
  line.SetAnchor(side2, plot, BOTTOMLEFT, x2, -y2)
  line.SetHidden(false)
  return undefined
}

function drawBar(plot: PlotControl, x1: number, x2: number, id: number): undefined {
  const barControls = plot.barControls ?? []
  plot.barControls = barControls

  let bar = barControls[id - 1]

  if (bar == null) {
    bar = CreateControlFromVirtual<BackdropControl & Control>(
      "$(parent)Bar",
      plot,
      "TemperCombat_PlotBar",
      id
    )
    barControls[id - 1] = bar
  }

  bar.ClearAnchors()

  const minX = 0

  const xoffset = plot.xoffset ?? 0

  let [maxX] = plot.GetDimensions()
  maxX = maxX - xoffset

  const outOfRange = x2 < minX || x1 > maxX

  if (outOfRange) {
    bar.SetHidden(false)
    return undefined
  }

  const left = zo_max(x1, minX) + xoffset
  const right = zo_min(x2, maxX) + xoffset

  const plotColors = getDb().FightReport.PlotColors

  const color = assert(plot.effectType === BUFF_EFFECT_TYPE_BUFF ? plotColors[6] : plotColors[7])

  bar.SetAnchor(TOPLEFT, plot, TOPLEFT, left, 0)
  bar.SetAnchor(BOTTOMRIGHT, plot, BOTTOMLEFT, right, 0)
  bar.SetCenterColor(color[0], color[1], color[2], color[3])
  bar.SetHidden(false)
  return undefined
}

export function drawXYPlot(plot: PlotControl): undefined {
  const plotWindow = assert(plot.GetParent<PlotWindowControl>())

  const xyData = plot.XYData

  if (xyData == null) {
    return undefined
  }

  const coordinates: [number, number, boolean][] = []
  plot.coordinates = coordinates

  for (const line of plot.lineControls ?? []) {
    line.SetHidden(true)
  }

  let x0 = 0
  let y0 = 0
  let inRange0 = false
  const normY = plot.YAxisSide === YAXIS_RIGHT

  let i = 0
  for (const dataPair of xyData) {
    i = i + 1
    const [t, v] = dataPair
    const [x, y, inRange] = mapValueXY(plotWindow, t, v, false, normY)
    coordinates[i - 1] = [x, y, inRange]

    if (i > 1) {
      const lineCoords: LineCoords = [x0, y0, x, y, inRange0, inRange]
      const id = i - 1

      drawLine(plot, lineCoords, id)
    }

    x0 = x
    y0 = y
    inRange0 = inRange
  }
  return undefined
}

export function drawBarPlot(plot: PlotControl): undefined {
  const plotWindow = assert(plot.GetParent<PlotWindowControl>())

  const bardata = plot.bardata

  if (bardata == null) {
    return undefined
  }

  for (const bar of plot.barControls ?? []) {
    bar.SetHidden(true)
  }

  let id = 0
  for (const times of bardata) {
    id = id + 1
    const [t1, t2] = times
    const [x1] = mapValue(plotWindow, PLOT_DIMENSION_X, t1, false)
    const [x2] = mapValue(plotWindow, PLOT_DIMENSION_X, t2, false)

    drawBar(plot, x1, x2, id)
  }
  return undefined
}

export function drawPlot(plot: PlotControl): undefined {
  if (plot.plotType === PLOT_TYPE_BAR) {
    drawBarPlot(plot)
  } else {
    drawXYPlot(plot)
  }
  return undefined
}
