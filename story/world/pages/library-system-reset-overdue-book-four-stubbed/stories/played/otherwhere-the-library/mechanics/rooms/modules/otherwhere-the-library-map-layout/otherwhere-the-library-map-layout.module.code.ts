import type { PlaceExitDirection } from "akasha/story/lore/place/properties/place-exit-direction.select-property.types.ts"

export type MapExit = {
  readonly to: string
  readonly direction: PlaceExitDirection | null
}

export type MapRoom = {
  readonly id: string
  readonly at: string
  readonly title: string
  readonly lit: boolean
  readonly depth: number | null
  readonly exits: readonly MapExit[]
}

export type PlacedRoom = {
  readonly room: MapRoom
  readonly column: number
  readonly row: number
  readonly up: boolean
  readonly down: boolean
}

export type MapLink = {
  readonly column: number
  readonly row: number
  readonly across: boolean
  readonly told: boolean
}

export type MapFloor = {
  readonly depth: number | null
  readonly rows: number
  readonly rooms: readonly PlacedRoom[]
  readonly links: readonly MapLink[]
}

export type MapLayout = {
  readonly columns: number
  readonly floors: readonly MapFloor[]
  readonly apart: readonly MapRoom[]
}

type Cell = {
  readonly column: number
  readonly row: number
}

type Near = {
  readonly at: string
  readonly direction: PlaceExitDirection | null
}

const OPPOSITE: Readonly<Record<PlaceExitDirection, PlaceExitDirection>> = {
  north: "south",
  south: "north",
  east: "west",
  west: "east",
  up: "down",
  down: "up",
}

const STEP: Readonly<Record<PlaceExitDirection, Cell>> = {
  north: { column: 0, row: -1 },
  south: { column: 0, row: 1 },
  east: { column: 1, row: 0 },
  west: { column: -1, row: 0 },
  up: { column: 0, row: 0 },
  down: { column: 0, row: 0 },
}

const FREE_FIRST: readonly Cell[] = [STEP.south, STEP.north, STEP.east, STEP.west]

const ORIGIN: Cell = { column: 0, row: 0 }

function isVertical(direction: PlaceExitDirection | null): boolean {
  return direction === "up" || direction === "down"
}

function nearOf(rooms: readonly MapRoom[]): ReadonlyMap<string, readonly Near[]> {
  const known = new Set(rooms.map((one) => one.at))
  const found = new Map<string, Near[]>()
  const add = (from: string, near: Near): undefined => {
    const list = found.get(from) ?? []
    const at = list.findIndex((one) => one.at === near.at)
    if (at === -1) list.push(near)
    else if (list[at]?.direction === null && near.direction !== null) list[at] = near
    found.set(from, list)
    return undefined
  }
  for (const room of rooms) {
    for (const exit of room.exits) {
      if (exit.to === room.at || !known.has(exit.to)) continue
      add(room.at, { at: exit.to, direction: exit.direction })
      const back = exit.direction === null ? null : OPPOSITE[exit.direction]
      add(exit.to, { at: room.at, direction: back })
    }
  }
  return found
}

function spreadFloors(
  rooms: readonly MapRoom[],
  near: ReadonlyMap<string, readonly Near[]>,
  floor: Map<string, number>,
  vertical: boolean
): boolean {
  let changed = false
  for (const room of rooms) {
    if (floor.has(room.at)) continue
    for (const one of near.get(room.at) ?? []) {
      const there = floor.get(one.at)
      if (there === undefined || isVertical(one.direction) !== vertical) continue
      const step = one.direction === "up" ? -1 : one.direction === "down" ? 1 : 0
      floor.set(room.at, there + step)
      changed = true
      break
    }
  }
  return changed
}

function floorsOf(
  rooms: readonly MapRoom[],
  near: ReadonlyMap<string, readonly Near[]>
): ReadonlyMap<string, number> {
  const floor = new Map<string, number>()
  for (const room of rooms) if (room.depth !== null) floor.set(room.at, room.depth)
  while (spreadFloors(rooms, near, floor, false) || spreadFloors(rooms, near, floor, true)) {}
  return floor
}

function keyOf(floor: number | null, cell: Cell): string {
  return `${floor ?? "none"}:${cell.column}:${cell.row}`
}

function moved(from: Cell, step: Cell): Cell {
  return { column: from.column + step.column, row: from.row + step.row }
}

function freeNear(
  taken: ReadonlySet<string>,
  floor: number | null,
  from: Cell,
  first: readonly Cell[]
): Cell {
  for (const step of first) {
    const cell = moved(from, step)
    if (!taken.has(keyOf(floor, cell))) return cell
  }
  for (let ring = 0; ; ring += 1) {
    for (let row = -ring; row <= ring; row += 1) {
      for (let column = -ring; column <= ring; column += 1) {
        if (Math.max(Math.abs(row), Math.abs(column)) !== ring) continue
        const cell = moved(from, { column, row })
        if (!taken.has(keyOf(floor, cell))) return cell
      }
    }
  }
}

function toldFirst(one: Near, other: Near): number {
  return Number(one.direction === null) - Number(other.direction === null)
}

function seedsOf(
  rooms: readonly MapRoom[],
  near: ReadonlyMap<string, readonly Near[]>
): readonly MapRoom[] {
  const count = (room: MapRoom): number => near.get(room.at)?.length ?? 0
  return [...rooms].sort((one, other) => {
    if (one.lit !== other.lit) return one.lit ? -1 : 1
    if (count(one) !== count(other)) return count(other) - count(one)
    return one.title.localeCompare(other.title)
  })
}

function cellsOf(
  rooms: readonly MapRoom[],
  near: ReadonlyMap<string, readonly Near[]>,
  floor: ReadonlyMap<string, number>
): ReadonlyMap<string, Cell> {
  const cells = new Map<string, Cell>()
  const taken = new Set<string>()
  const put = (at: string, cell: Cell): undefined => {
    cells.set(at, cell)
    taken.add(keyOf(floor.get(at) ?? null, cell))
    return undefined
  }
  for (const seed of seedsOf(rooms, near)) {
    if (cells.has(seed.at)) continue
    put(seed.at, freeNear(taken, floor.get(seed.at) ?? null, ORIGIN, []))
    const queue = [seed.at]
    for (let at = queue.shift(); at !== undefined; at = queue.shift()) {
      const from = cells.get(at)
      if (from === undefined) continue
      for (const one of [...(near.get(at) ?? [])].sort(toldFirst)) {
        if (cells.has(one.at)) continue
        const there = floor.get(one.at) ?? null
        const cell =
          one.direction === null
            ? freeNear(taken, there, from, FREE_FIRST)
            : freeNear(taken, there, moved(from, STEP[one.direction]), [])
        put(one.at, cell)
        queue.push(one.at)
      }
    }
  }
  return cells
}

function highestFirst(one: number | null, other: number | null): number {
  if (one === other) return 0
  if (one === null) return 1
  if (other === null) return -1
  return other - one
}

export function mapLayoutOf(rooms: readonly MapRoom[]): MapLayout {
  const near = nearOf(rooms)
  const apart = rooms.filter((one) => (near.get(one.at)?.length ?? 0) === 0)
  const joined = rooms.filter((one) => (near.get(one.at)?.length ?? 0) > 0)
  const floor = floorsOf(joined, near)
  const cells = cellsOf(joined, near, floor)
  const columnsAt = [...cells.values()].map((one) => one.column)
  const least = columnsAt.length === 0 ? 0 : Math.min(...columnsAt)
  const most = columnsAt.length === 0 ? 0 : Math.max(...columnsAt)
  const depths = [...new Set(joined.map((one) => floor.get(one.at) ?? null))].sort(highestFirst)
  const floors = depths.map((depth): MapFloor => {
    const here = joined.filter((one) => (floor.get(one.at) ?? null) === depth)
    const rowsAt = here.map((one) => cells.get(one.at)?.row ?? 0)
    const top = Math.min(...rowsAt)
    const placed = new Map<string, PlacedRoom>()
    for (const room of here) {
      const cell = cells.get(room.at) ?? ORIGIN
      const ways = near.get(room.at) ?? []
      placed.set(room.at, {
        room,
        column: cell.column - least,
        row: cell.row - top,
        up: ways.some((one) => one.direction === "up"),
        down: ways.some((one) => one.direction === "down"),
      })
    }
    const links: MapLink[] = []
    for (const [at, one] of placed) {
      for (const way of near.get(at) ?? []) {
        const other = placed.get(way.at)
        if (other === undefined || way.at < at) continue
        if (Math.abs(one.column - other.column) + Math.abs(one.row - other.row) !== 1) continue
        links.push({
          column: one.column + other.column,
          row: one.row + other.row,
          across: one.row === other.row,
          told: way.direction !== null && !isVertical(way.direction),
        })
      }
    }
    return { depth, rows: Math.max(...rowsAt) - top + 1, rooms: [...placed.values()], links }
  })
  return { columns: most - least + 1, floors, apart }
}
