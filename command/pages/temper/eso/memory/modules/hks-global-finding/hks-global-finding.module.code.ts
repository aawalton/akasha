import {
  foundEachScanning,
  type Region,
  ranToEnd,
  ranUntilStopped,
  type Scan,
  type Scanning,
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

function stringsOf(read: Reader, name: string, hits: readonly bigint[], search: Search): bigint[] {
  search.copies += hits.length
  if (hits.length >= MOST_COPIES) search.capped = true
  const strings = hits.map((hit) => hit - TEXT_AT).filter((object) => textAt(read, object) === name)
  search.strings += strings.length
  return strings
}

export function globalKeyOf(global: Global): string {
  return `${global.node}:${global.name}`
}

function* globalsFinding(
  read: Reader,
  regions: readonly Region[],
  names: readonly string[],
  searches: readonly Search[],
  left: ReadonlySet<string>
): Scanning<readonly (Global | null)[]> {
  const scan = searches[0]?.scan ?? scanAfresh()
  const texts = names.map((name) => Buffer.from(name, "utf8"))
  const copies = yield* foundEachScanning(read, regions, texts, 1n, MOST_COPIES, scan)
  const strings = names.map((name, index) =>
    stringsOf(read, name, copies[index] ?? [], searches[index] ?? searchAfresh())
  )
  const objects = strings.flat()
  const words = objects.map((object) => wordBytes(object))
  const settled: (Global | null)[] = strings.map(() => null)
  const checked = new Set<bigint>()
  const settle = (pointers: readonly (readonly bigint[])[]): boolean => {
    strings.forEach((held, index) => {
      if (settled[index] !== null) return
      for (const object of held) {
        for (const pointer of pointers[objects.indexOf(object)] ?? []) {
          if (checked.has(pointer)) continue
          checked.add(pointer)
          const global = { node: pointer - BigInt(WORD), name: object }
          if (left.has(globalKeyOf(global)) || globalHeld(read, global) === null) continue
          settled[index] = global
          return
        }
      }
    })
    return settled.every((one, index) => one !== null || (strings[index]?.length ?? 0) === 0)
  }
  settle(yield* foundEachScanning(read, regions, words, BigInt(WORD), MOST_POINTERS, scan, settle))
  return settled
}

export function globalsFoundUntilStopped(
  read: Reader,
  regions: readonly Region[],
  names: readonly string[],
  searches: readonly Search[],
  left: ReadonlySet<string>,
  signal: AbortSignal
): Promise<readonly (Global | null)[] | null> {
  return ranUntilStopped(globalsFinding(read, regions, names, searches, left), signal)
}

export function globalFound(
  read: Reader,
  regions: readonly Region[],
  name: string,
  search: Search = searchAfresh()
): Global | null {
  return ranToEnd(globalsFinding(read, regions, [name], [search], new Set()))[0] ?? null
}
