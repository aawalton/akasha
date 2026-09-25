import type {
  EideticBook,
  EideticBookZoneEntry,
  ShalidorDataTable,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-types/lorebooks-types.module.code.ts"

export type Row = Readonly<Record<string, unknown>>

export const PLACE_KEYS: Readonly<Record<string, string>> = {
  pm: "mapId",
  px: "mapX",
  py: "mapY",
  zm: "zoneMapId",
  zx: "zoneX",
  zy: "zoneY",
  d: "dungeon",
  ld: "locationDetail",
  mn: "mn",
  fp: "fp",
  qc: "qc",
  qp: "qp",
  l: "l",
  r: "r",
  x: "x",
  y: "y",
  z: "z",
  pnx: "pnx",
  pny: "pny",
  zt: "zt",
  i: "i",
  sm: "sm",
}

const ALTERNATE = "4"

function placeRow(place: EideticBookZoneEntry): Row {
  const row: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(place)) {
    if (key === ALTERNATE) {
      row.alternate = placeRow(value as EideticBookZoneEntry)
      continue
    }
    const named = PLACE_KEYS[key]
    if (named === undefined) throw new Error(`a place holds \`${key}\`, which no property carries`)
    row[named] = value
  }
  return row
}

export function placesOf(book: EideticBook): readonly Row[] {
  return (book.e ?? []).map(placeRow)
}

export function mapCountsOf(book: EideticBook): readonly Row[] {
  const counts: Row[] = []
  for (const [map, given] of Object.entries(book.m ?? {})) {
    const mapId = Number(map)
    counts.push(
      typeof given === "boolean" ? { mapId, mapFlagged: given } : { mapId, mapCount: given }
    )
  }
  return counts
}

export function tableValuesOf(bookId: number, book: EideticBook): Record<string, unknown> {
  const values: Record<string, unknown> = { esoBookId: bookId }
  if (typeof book.n === "number") values.numberedTitle = book.n
  if (book.c !== undefined) values.charted = book.c
  if (book.r !== undefined) values.onBookshelves = book.r
  if (book.q !== undefined) values.quest = book.q
  if (book.k !== undefined) {
    if (book.k !== bookId) throw new Error(`book ${bookId} repeats ${book.k} as its id`)
    values.keyed = true
  }
  if (book.l !== undefined) values.loreBooksL = book.l
  const counts = mapCountsOf(book)
  if (counts.length > 0) values.mapCounts = counts
  const places = placesOf(book)
  if (places.length > 0) values.positions = places
  return values
}

const X = 1
const Y = 2
const COLLECTION = 3
const BOOK = 4
const ZONE = 5
const SIXTH = 6

export function shalidorPinsOf(
  table: ShalidorDataTable,
  collectionIndex: number,
  bookIndex: number
): readonly Row[] {
  const pins: Row[] = []
  const maps = Object.keys(table)
    .map(Number)
    .sort((a, b) => a - b)
  for (const mapId of maps) {
    for (const [at, pin] of (table[mapId] ?? []).entries()) {
      if (pin[COLLECTION] !== collectionIndex || pin[BOOK] !== bookIndex) continue
      const row: Record<string, unknown> = { mapId, mapOrder: at + 1, mapX: pin[X], mapY: pin[Y] }
      if (pin[ZONE] !== undefined) row.esoZoneId = pin[ZONE]
      if (pin[SIXTH] !== undefined) row.shalidor6 = pin[SIXTH]
      if (pin.worldY !== undefined) row.worldY = pin.worldY
      if (pin.ld !== undefined) row.locationDetails = [...pin.ld]
      pins.push(row)
    }
  }
  return pins
}
