export type HudDock =
  | "top-left"
  | "top"
  | "top-right"
  | "left"
  | "right"
  | "bottom-left"
  | "bottom"
  | "bottom-right"

export type HudPoint = "TOPLEFT" | "TOP" | "TOPRIGHT" | "BOTTOMLEFT" | "BOTTOM" | "BOTTOMRIGHT"

export interface HudPanelBox {
  readonly control: string
  readonly dock: HudDock
  readonly order: number
  readonly top: number
  readonly height: number
  readonly hidden: boolean
  readonly fixed: boolean
  readonly shrinks: boolean
}

export interface HudPanelPlace {
  readonly control: string
  readonly point: HudPoint
  readonly offsetX: number
  readonly offsetY: number
  readonly room: number
}

export interface HudScreen {
  readonly width: number
  readonly height: number
}

type Side = "left" | "center" | "right"

type Rooms = Map<string, number>

const COLUMNS: readonly (readonly [HudDock, HudDock | undefined, HudDock])[] = [
  ["top-left", "left", "bottom-left"],
  ["top", undefined, "bottom"],
  ["top-right", "right", "bottom-right"],
]

function sideOf(dock: HudDock): Side {
  if (dock === "top-left" || dock === "left" || dock === "bottom-left") return "left"
  if (dock === "top" || dock === "bottom") return "center"
  return "right"
}

function pointOf(side: Side, fromBottom: boolean): HudPoint {
  if (side === "left") return fromBottom ? "BOTTOMLEFT" : "TOPLEFT"
  if (side === "center") return fromBottom ? "BOTTOM" : "TOP"
  return fromBottom ? "BOTTOMRIGHT" : "TOPRIGHT"
}

function offsetXOf(side: Side, gap: number): number {
  if (side === "left") return gap
  if (side === "center") return 0
  return -gap
}

function shownIn(panels: readonly HudPanelBox[], dock: HudDock | undefined): HudPanelBox[] {
  if (dock === undefined) return []
  return panels
    .filter((panel) => panel.dock === dock && !panel.hidden)
    .sort((a, b) => (a.fixed === b.fixed ? a.order - b.order : a.fixed ? -1 : 1))
}

function roomOf(panel: HudPanelBox, rooms: Rooms): number {
  return rooms.get(panel.control) ?? panel.height
}

function stackHeight(panels: readonly HudPanelBox[], rooms: Rooms, gap: number): number {
  let total = 0
  for (const panel of panels) total += gap + roomOf(panel, rooms)
  return panels.length > 0 ? total - gap : 0
}

function startEnd(panels: readonly HudPanelBox[], rooms: Rooms, gap: number): number {
  if (panels.length === 0) return 0
  let cursor = gap
  for (const panel of panels) {
    cursor = panel.fixed
      ? Math.max(cursor, panel.top + panel.height + gap)
      : cursor + roomOf(panel, rooms) + gap
  }
  return cursor - gap
}

function endStart(
  panels: readonly HudPanelBox[],
  rooms: Rooms,
  gap: number,
  height: number
): number {
  if (panels.length === 0) return height
  let cursor = height - gap
  for (const panel of panels) {
    cursor = panel.fixed ? Math.min(cursor, panel.top - gap) : cursor - roomOf(panel, rooms) - gap
  }
  return cursor + gap
}

function shrinkToFit(
  over: number,
  starting: readonly HudPanelBox[],
  middle: readonly HudPanelBox[],
  ending: readonly HudPanelBox[]
): Rooms {
  const rooms: Rooms = new Map()
  const lowestFirst = [...starting, ...middle, ...ending.slice().reverse()].reverse()
  let left = over
  for (const panel of lowestFirst) {
    if (left <= 0) break
    if (!panel.shrinks || panel.fixed) continue
    const taken = Math.min(panel.height, left)
    rooms.set(panel.control, panel.height - taken)
    left -= taken
  }
  return rooms
}

function placeColumn(
  screen: HudScreen,
  panels: readonly HudPanelBox[],
  gaps: Readonly<Record<HudDock, number>>,
  [startDock, middleDock, endDock]: readonly [HudDock, HudDock | undefined, HudDock]
): HudPanelPlace[] {
  const starting = shownIn(panels, startDock)
  const middle = shownIn(panels, middleDock)
  const ending = shownIn(panels, endDock)
  const startGap = gaps[startDock]
  const endGap = gaps[endDock]
  const middleGap = middleDock === undefined ? 0 : gaps[middleDock]
  const between = Math.max(startGap, endGap, middleGap)
  const natural: Rooms = new Map()
  const middleRun = (rooms: Rooms): number =>
    middle.length > 0 ? between + stackHeight(middle, rooms, middleGap) + between : between
  const over =
    startEnd(starting, natural, startGap) +
    middleRun(natural) -
    endStart(ending, natural, endGap, screen.height)
  const rooms = over > 0 ? shrinkToFit(over, starting, middle, ending) : natural
  const places: HudPanelPlace[] = []
  let cursor = startGap
  for (const panel of starting) {
    if (panel.fixed) {
      cursor = Math.max(cursor, panel.top + panel.height + startGap)
      continue
    }
    const side = sideOf(startDock)
    const room = roomOf(panel, rooms)
    places.push({
      control: panel.control,
      point: pointOf(side, false),
      offsetX: offsetXOf(side, startGap),
      offsetY: cursor,
      room,
    })
    cursor += room + startGap
  }
  let fromBottom = endGap
  for (const panel of ending) {
    if (panel.fixed) {
      fromBottom = Math.max(fromBottom, screen.height - panel.top + endGap)
      continue
    }
    const side = sideOf(endDock)
    const room = roomOf(panel, rooms)
    places.push({
      control: panel.control,
      point: pointOf(side, true),
      offsetX: offsetXOf(side, endGap),
      offsetY: -fromBottom,
      room,
    })
    fromBottom += room + endGap
  }
  if (middleDock === undefined || middle.length === 0) return places
  const middleHeight = stackHeight(middle, rooms, middleGap)
  const highest = startEnd(starting, rooms, startGap) + between
  const lowest = endStart(ending, rooms, endGap, screen.height) - between - middleHeight
  let middleCursor = Math.max(highest, Math.min(lowest, (screen.height - middleHeight) / 2))
  const side = sideOf(middleDock)
  for (const panel of middle) {
    const room = roomOf(panel, rooms)
    places.push({
      control: panel.control,
      point: pointOf(side, false),
      offsetX: offsetXOf(side, middleGap),
      offsetY: middleCursor,
      room,
    })
    middleCursor += room + middleGap
  }
  return places
}

export function placeHudPanels(
  screen: HudScreen,
  panels: readonly HudPanelBox[],
  gaps: Readonly<Record<HudDock, number>>
): HudPanelPlace[] {
  return COLUMNS.flatMap((column) => placeColumn(screen, panels, gaps, column))
}
