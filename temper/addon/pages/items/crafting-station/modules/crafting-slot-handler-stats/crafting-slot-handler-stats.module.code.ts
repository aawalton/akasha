import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

let COUNT = 0
let TOTAL_MS = 0

export interface SlotHandlerStats {
  count: number
  totalMs: number
}

export interface InstrumentTally {
  count: number
  totalMs: number
  maxMs: number
}

const TOP_LEVEL_ORDER = ["slotHandler", "rowMark", "writMark"]
const NESTED_ORDER = ["getCharacters"]

const TOP_LEVEL: Record<string, InstrumentTally | undefined> = {}
const NESTED: Record<string, InstrumentTally | undefined> = {}

function tally(
  this: void,
  into: Record<string, InstrumentTally | undefined>,
  bucket: string,
  ms: number
): undefined {
  const held = into[bucket]
  if (held === undefined) {
    into[bucket] = { count: 1, totalMs: ms, maxMs: ms }
    return
  }
  held.count = held.count + 1
  held.totalMs = held.totalMs + ms
  if (ms > held.maxMs) {
    held.maxMs = ms
  }
}

export function getSlotHandlerStats(this: void): SlotHandlerStats {
  return { count: COUNT, totalMs: TOTAL_MS }
}

export function recordInstrumentMs(this: void, bucket: string, ms: number): undefined {
  COUNT = COUNT + 1
  TOTAL_MS = TOTAL_MS + ms
  tally(TOP_LEVEL, bucket, ms)
}

export function recordNestedInstrumentMs(this: void, bucket: string, ms: number): undefined {
  tally(NESTED, bucket, ms)
}

export function timed<A extends unknown[]>(
  fn: (this: void, ...args: A) => undefined
): (this: void, ...args: A) => undefined {
  return function (this: void, ...args: A): undefined {
    const start = GetGameTimeMilliseconds()
    fn(...args)
    recordInstrumentMs("slotHandler", GetGameTimeMilliseconds() - start)
  }
}

function tallySaid(this: void, bucket: string, held: InstrumentTally | undefined): string {
  if (held === undefined) {
    return `  ${bucket}: n=0`
  }
  return `  ${bucket}: n=${held.count} total=${held.totalMs}ms max=${held.maxMs}ms`
}

function reportInstrumentStats(this: void): undefined {
  d(`[TemperItemsCrafting] instrumented since load: n=${COUNT} total=${TOTAL_MS}ms`)
  for (const [, bucket] of ipairs(TOP_LEVEL_ORDER)) {
    d(tallySaid(bucket, TOP_LEVEL[bucket]))
  }
  d("  nested, already counted inside the buckets above:")
  for (const [, bucket] of ipairs(NESTED_ORDER)) {
    d(tallySaid(bucket, NESTED[bucket]))
  }
}

SLASH_COMMANDS["/tcstats"] = reportInstrumentStats
