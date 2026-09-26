import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"

export interface GraveElement {
  coords: readonly number[]
  color: readonly number[]
  texture?: string
  text?: string
  fontSize?: number
}

const MAP_TILE = "esoui/art/worldmap/worldmap_map_background_512tile.dds"

export const GRAVE_ELEMENTS: readonly GraveElement[] = [
  {
    coords: [-0.6, 1.8, 0.3, 0.6, 0, 0.3, 0.6, 1.8, 0.3],
    color: [0.5, 0.5, 0.5, 1],
    texture: MAP_TILE,
  },
  { coords: [-0.6, 1.8, 0, 0.6, 0, 0, 0.6, 1.8, 0], color: [0.5, 0.5, 0.5, 1], texture: MAP_TILE },

  {
    coords: [-0.6, 1.5, 0.31, 0.6, 1.4, 0.31, 0.6, 1.5, 0.31],
    color: [0.1, 0.1, 0.1, 1],
    text: "<<1>>",
  },
  {
    coords: [-0.6, 1.3, 0.31, 0.6, 1.2, 0.31, 0.6, 1.3, 0.31],
    color: [0.1, 0.1, 0.1, 1],
    text: "<<2>>",
  },

  {
    coords: [-0.6, 1, 0.31, 0.6, 0.9, 0.31, 0.6, 1, 0.31],
    color: [0.1, 0.1, 0.1, 1],
    text: "<<3>>",
    fontSize: 14,
  },
  {
    coords: [-0.6, 0.9, 0.31, 0.6, 0.8, 0.31, 0.6, 0.9, 0.31],
    color: [0.1, 0.1, 0.1, 1],
    text: "-",
    fontSize: 14,
  },
  {
    coords: [-0.6, 0.77, 0.31, 0.6, 0.67, 0.31, 0.6, 0.77, 0.31],
    color: [0.1, 0.1, 0.1, 1],
    text: "<<4>>",
    fontSize: 14,
  },

  {
    coords: [-0.6, 1.8, 0, -0.6, 0, 0.3, -0.6, 1.8, 0.3],
    color: [0.4, 0.4, 0.4, 1],
    texture: MAP_TILE,
  },
  {
    coords: [-0.6, 1.8, 0, 0.6, 1.8, 0.3, 0.6, 1.8, 0],
    color: [0.45, 0.45, 0.45, 1],
    texture: MAP_TILE,
  },
  { coords: [0.6, 1.8, 0.3, 0.6, 0, 0, 0.6, 1.8, 0], color: [0.4, 0.4, 0.4, 1], texture: MAP_TILE },
]

export const GRAVE_INTROS: readonly string[] = [
  "Here lies",
  "In loving memory of",
  "R.I.P.",
  "Rest in Peace",
  "Rest in Pieces",
  "Never forgotten",
  "Gone too soon",
]

export function calculateGraveValues(
  this: void,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  x3: number,
  y3: number,
  z3: number
): LuaMultiReturn<[number, number, number, number, number, number, number, number]> {
  const oX = (x1 + x2) / 2
  const oY = (y1 + y2) / 2
  const oZ = (z1 + z2) / 2

  const height = math.sqrt((x3 - x2) ** 2 + (y3 - y2) ** 2 + (z3 - z2) ** 2)
  const width = math.sqrt((x3 - x1) ** 2 + (y3 - y1) ** 2 + (z3 - z1) ** 2)
  const pitch = math.atan2(z3 - z2, y3 - y2)
  const yaw = math.atan2(z3 - z1, x3 - x1)
  const roll = -math.atan2(x3 - x2, y3 - y2)

  return $multi(oX, oY, oZ, pitch, yaw, roll, width, height)
}

export function coordsValues(
  this: void,
  coords: readonly number[]
): LuaMultiReturn<[number, number, number, number, number, number, number, number]> {
  return calculateGraveValues(
    coords[0] as number,
    coords[1] as number,
    coords[2] as number,
    coords[3] as number,
    coords[4] as number,
    coords[5] as number,
    coords[6] as number,
    coords[7] as number,
    coords[8] as number
  )
}

const MONTHS: readonly string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export function formatDate(this: void, timestamp: number): string {
  const [year, month, day] = GetDateElementsFromTimestamp(timestamp)
  return zo_strformat("<<1>> <<2>>, <<3>>", MONTHS[month - 1], day, year)
}
