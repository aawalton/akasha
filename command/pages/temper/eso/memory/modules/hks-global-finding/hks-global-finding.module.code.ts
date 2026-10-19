import {
  found,
  type Region,
  type Scan,
  scanAfresh,
  wordBytes,
} from "akasha/command/pages/temper/eso/memory/modules/eso-process-memory/eso-process-memory.module.code.ts"
import {
  type Held,
  type Reader,
  textAt,
} from "akasha/command/pages/temper/eso/memory/modules/hks-table-reading/hks-table-reading.module.code.ts"

export type Global = { readonly node: bigint; readonly name: bigint }

const STRING = 4

const TABLE = 5

const WORD = 8

const NODE = 32

const TEXT_AT = 0x14n

const MOST_COPIES = 64

const MOST_POINTERS = 256

export function globalHeld(read: Reader, global: Global): Held | null {
  const bytes = read(global.node, NODE)
  if (bytes === null || bytes.length < NODE) return null
  if (bytes.readUInt32LE(0) !== STRING || bytes.readBigUInt64LE(WORD) !== global.name) return null
  if (bytes.readUInt32LE(2 * WORD) !== TABLE) return null
  return { type: TABLE, value: bytes.readBigUInt64LE(3 * WORD) }
}

export type Search = { copies: number; strings: number; capped: boolean; scan: Scan }

export function searchAfresh(): Search {
  return { copies: 0, strings: 0, capped: false, scan: scanAfresh() }
}

export function globalFound(
  read: Reader,
  regions: readonly Region[],
  name: string,
  search: Search = searchAfresh()
): Global | null {
  const hits = found(read, regions, Buffer.from(name, "utf8"), 1n, MOST_COPIES, search.scan)
  search.copies += hits.length
  if (hits.length >= MOST_COPIES) search.capped = true
  for (const hit of hits) {
    const object = hit - TEXT_AT
    if (textAt(read, object) !== name) continue
    search.strings += 1
    const pointers = found(
      read,
      regions,
      wordBytes(object),
      BigInt(WORD),
      MOST_POINTERS,
      search.scan
    )
    for (const pointer of pointers) {
      const global = { node: pointer - BigInt(WORD), name: object }
      if (globalHeld(read, global) !== null) return global
    }
  }
  return null
}
