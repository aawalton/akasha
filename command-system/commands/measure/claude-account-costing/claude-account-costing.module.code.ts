import { type Dirent, readdirSync, readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { parseSessionLine } from "@akasha/seat-system/session-jsonl"
import type { TokenUsage } from "@akasha/seat-system/session-jsonl-schema"

const PER_MILLION = 1000000

const DAY_MS = 86400000

const USAGE_MARK = '"usage"'

const TRANSCRIPT_SUFFIX = ".jsonl"

const STAMP_LENGTH = 8

export interface Rates {
  readonly input: number
  readonly write5m: number
  readonly write1h: number
  readonly read: number
  readonly output: number
}

export interface Tokens {
  readonly input: number
  readonly write5m: number
  readonly write1h: number
  readonly read: number
  readonly output: number
  readonly calls: number
}

export interface Counted {
  readonly byModel: ReadonlyMap<string, Tokens>
  readonly unpriced: readonly string[]
  readonly files: number
}

const FABLE_5_1: Rates = { input: 10, write5m: 12.5, write1h: 20, read: 0.25, output: 50 }
const FABLE_5: Rates = { input: 10, write5m: 12.5, write1h: 20, read: 1, output: 50 }
const OPUS_5: Rates = { input: 5, write5m: 6.25, write1h: 10, read: 0.5, output: 25 }
const OPUS_4_1: Rates = { input: 15, write5m: 18.75, write1h: 30, read: 1.5, output: 75 }
const SONNET_5: Rates = { input: 2, write5m: 2.5, write1h: 4, read: 0.2, output: 10 }
const SONNET_4_5: Rates = { input: 3, write5m: 3.75, write1h: 6, read: 0.3, output: 15 }
const HAIKU_4_5: Rates = { input: 1, write5m: 1.25, write1h: 2, read: 0.1, output: 5 }
const HAIKU_3_5: Rates = { input: 0.8, write5m: 1, write1h: 1.6, read: 0.08, output: 4 }

const RATES: ReadonlyMap<string, Rates> = new Map([
  ["claude-fable-5-1", FABLE_5_1],
  ["claude-mythos-5-1", FABLE_5_1],
  ["claude-fable-5", FABLE_5],
  ["claude-mythos-5", FABLE_5],
  ["claude-opus-5", OPUS_5],
  ["claude-opus-4-8", OPUS_5],
  ["claude-opus-4-7", OPUS_5],
  ["claude-opus-4-6", OPUS_5],
  ["claude-opus-4-5", OPUS_5],
  ["claude-opus-4-1", OPUS_4_1],
  ["claude-opus-4", OPUS_4_1],
  ["claude-sonnet-5", SONNET_5],
  ["claude-sonnet-4-6", SONNET_4_5],
  ["claude-sonnet-4-5", SONNET_4_5],
  ["claude-sonnet-4", SONNET_4_5],
  ["claude-haiku-4-5", HAIKU_4_5],
  ["claude-3-5-haiku", HAIKU_3_5],
])

interface Sum {
  input: number
  write5m: number
  write1h: number
  read: number
  output: number
  calls: number
}

export function modelNamed(model: string): string {
  const parts = model.split("-")
  const last = parts[parts.length - 1]
  if (last === undefined || last.length !== STAMP_LENGTH) return model
  return /^\d+$/.test(last) ? parts.slice(0, -1).join("-") : model
}

export function ratesFor(model: string): Rates | null {
  return RATES.get(modelNamed(model)) ?? null
}

export function costOf(tokens: Tokens, rates: Rates): number {
  const said =
    tokens.input * rates.input +
    tokens.write5m * rates.write5m +
    tokens.write1h * rates.write1h +
    tokens.read * rates.read +
    tokens.output * rates.output
  return said / PER_MILLION
}

export function storeIn(base: string): string {
  return join(base, "projects")
}

export function storeHere(): string {
  const said = process.env.CLAUDE_CONFIG_DIR
  return storeIn(said === undefined || said === "" ? join(homedir(), ".claude") : said)
}

export function sinceOf(now: number, days: number): number {
  return now - days * DAY_MS
}

export function transcriptsUnder(folder: string): readonly string[] {
  const found: string[] = []
  const left: string[] = [folder]
  while (left.length > 0) {
    const at = left.pop()
    if (at === undefined) continue
    let entries: readonly Dirent[]
    try {
      entries = readdirSync(at, { withFileTypes: true })
    } catch {
      continue
    }
    for (const one of entries) {
      const path = join(at, one.name)
      if (one.isDirectory()) left.push(path)
      else if (one.name.endsWith(TRANSCRIPT_SUFFIX)) found.push(path)
    }
  }
  return found
}

function movedIn(usage: TokenUsage): number {
  return (
    usage.input_tokens +
    usage.output_tokens +
    usage.cache_read_input_tokens +
    usage.cache_creation_input_tokens
  )
}

function addUsage(into: Sum, usage: TokenUsage): undefined {
  const made = usage.cache_creation
  const short = made?.ephemeral_5m_input_tokens ?? 0
  const long = made?.ephemeral_1h_input_tokens ?? 0
  into.calls += 1
  into.input += usage.input_tokens
  into.output += usage.output_tokens
  into.read += usage.cache_read_input_tokens
  into.write5m += short + (short + long === 0 ? usage.cache_creation_input_tokens : 0)
  into.write1h += long
  return undefined
}

export function countedIn(folder: string, since: number, until: number): Counted {
  const sums = new Map<string, Sum>()
  const seen = new Set<string>()
  const unpriced = new Set<string>()
  let files = 0
  for (const path of transcriptsUnder(folder)) {
    files += 1
    let text: string
    try {
      text = readFileSync(path, "utf8")
    } catch {
      continue
    }
    for (const line of text.split("\n")) {
      if (!line.includes(USAGE_MARK)) continue
      const said = parseSessionLine(line)
      if (said === null || said.type !== "assistant") continue
      const usage = said.message.usage
      const stamp = said.timestamp
      const model = said.message.model
      if (usage === undefined || stamp === undefined || model === undefined) continue
      if (movedIn(usage) === 0) continue
      const at = Date.parse(stamp)
      if (Number.isNaN(at) || at < since || at > until) continue
      const id = said.message.id
      if (id !== undefined && seen.has(id)) continue
      if (id !== undefined) seen.add(id)
      const named = modelNamed(model)
      if (ratesFor(named) === null) {
        unpriced.add(named)
        continue
      }
      let sum = sums.get(named)
      if (sum === undefined) {
        sum = { input: 0, write5m: 0, write1h: 0, read: 0, output: 0, calls: 0 }
        sums.set(named, sum)
      }
      addUsage(sum, usage)
    }
  }
  return { byModel: sums, unpriced: [...unpriced].sort(), files }
}

export function totalOf(counted: Counted): number {
  let total = 0
  for (const [model, tokens] of counted.byModel) {
    const rates = ratesFor(model)
    if (rates !== null) total += costOf(tokens, rates)
  }
  return total
}

export function linesOf(counted: Counted, days: number): readonly string[] {
  const priced: { readonly name: string; readonly cost: number; readonly calls: number }[] = []
  for (const [model, tokens] of counted.byModel) {
    const rates = ratesFor(model)
    if (rates !== null)
      priced.push({ name: model, cost: costOf(tokens, rates), calls: tokens.calls })
  }
  priced.sort((one, two) => two.cost - one.cost)
  const total = totalOf(counted)
  const named = [...priced.map((one) => one.name), "total"]
  const width = Math.max(...named.map((one) => one.length))
  const amounts = [...priced.map((one) => one.cost), total].map((one) => one.toFixed(2))
  const money = Math.max(...amounts.map((one) => one.length))
  const said = priced.map(
    (one, at) => `${one.name.padEnd(width)}  ${(amounts[at] ?? "").padStart(money)}`
  )
  said.push(`${"total".padEnd(width)}  ${(amounts[amounts.length - 1] ?? "").padStart(money)}`)
  said.push(`over ${String(days)} days, ${String(counted.files)} transcripts`)
  for (const one of counted.unpriced)
    said.push(`this holds no price for ${one}, so it is not counted`)
  return said
}
