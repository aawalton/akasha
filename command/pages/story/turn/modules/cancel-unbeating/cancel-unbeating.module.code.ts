import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import type { BeatChange } from "akasha/story/engine/beat-state/modules/beat-changes/beat-changes.module.code.ts"
import { shownThrough } from "akasha/story/engine/beat-state/modules/beat-flow/beat-flow.module.code.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { pathOf } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

const PARTED = "/"

const BREAK = "\n"

const TURN = "turn"

const POSITION = "position"

export type PageRead = { readonly at: string; readonly value: Readonly<Record<string, unknown>> }

export type Beside = { readonly at: string; readonly text: string }

export type Unbeating = {
  readonly pageOf: (address: string) => PageRead | null
  readonly beside: (page: PageRead, key: string) => Beside | null
}

export type Unbeat = {
  readonly namings: readonly Naming[]
  readonly rewritten: readonly { readonly at: string; readonly kept: string }[]
  readonly removed: readonly string[]
  readonly report: readonly string[]
}

type Refused = { readonly refused: string }

function turnOf(line: string): unknown {
  try {
    const held: unknown = JSON.parse(line)
    return isRecord(held) ? held[TURN] : undefined
  } catch {
    return undefined
  }
}

type Sorted = {
  readonly firsts: Map<string, Map<string, unknown>>
  readonly appended: Map<string, Set<string>>
  readonly made: Set<string>
}

function sortedOf(written: readonly BeatChange[]): Sorted {
  const made = new Set(written.filter((one) => one.make !== undefined).map((one) => one.page))
  const firsts = new Map<string, Map<string, unknown>>()
  const appended = new Map<string, Set<string>>()
  for (const one of written) {
    if (made.has(one.page)) continue
    const key = one.key ?? ""
    if (one.append !== undefined) {
      appended.set(one.page, (appended.get(one.page) ?? new Set<string>()).add(key))
      continue
    }
    const keys = firsts.get(one.page) ?? new Map<string, unknown>()
    if (!keys.has(key)) keys.set(key, one.from ?? null)
    firsts.set(one.page, keys)
  }
  return { firsts, appended, made }
}

type Valuing = (root: string, path: string) => Readonly<Record<string, unknown>> | null

export function unbeatingIn(
  root: string,
  valueAt: Valuing,
  textIn: (within: string, path: string) => string
): Unbeating {
  return {
    pageOf: (address) => {
      const at = pathOf(root, address)
      const value = at === null ? null : valueAt(root, at)
      return at === null || value === null ? null : { at, value }
    },
    beside: (page, key) => {
      const ending = page.value[key]
      const at = typeof ending === "string" ? besideAt(page.at, key, ending) : null
      return at === null ? null : { at, text: textIn(root, at) }
    },
  }
}

export type Mechanics = {
  readonly namings: readonly Naming[]
  readonly rewritten: readonly { readonly at: string; readonly kept: string }[]
  readonly removed?: readonly string[]
  readonly report: readonly string[]
}

type Taking = {
  readonly valueAt: Valuing
  readonly textIn: (within: string, path: string) => string
}

type Undone = { readonly namings: readonly Naming[]; readonly report: readonly string[] }

export function shownTakenBack(
  reach: Taking,
  root: string,
  turn: Turn,
  undone: Undone,
  beats: Beats
): Mechanics | Refused {
  const position = parseNumber(turn.value[POSITION])
  if (position === undefined) return { refused: `\`${turn.at}\` states no position` }
  const reading = unbeatingIn(root, reach.valueAt, reach.textIn)
  const unbeat = unbeaten(beats.changes, shownThrough(beats), position, reading)
  if ("refused" in unbeat) return unbeat
  const { namings, rewritten, removed, report } = unbeat
  return {
    namings: [...namings, ...undone.namings],
    rewritten,
    removed,
    report: [...report, ...undone.report],
  }
}

function unpaged(page: string): Refused {
  return { refused: `\`${page}\`, which the turn's shown beats changed, is no page here` }
}

export function unbeaten(
  changes: readonly BeatChange[],
  shown: number,
  position: number,
  reading: Unbeating
): Unbeat | Refused {
  const { firsts, appended, made } = sortedOf(changes.filter((one) => one.beat <= shown))
  const namings: Naming[] = []
  const rewritten: { at: string; kept: string }[] = []
  const report: string[] = []
  for (const [page, keys] of firsts) {
    const read = reading.pageOf(page)
    if (read === null) return unpaged(page)
    const cut = page.indexOf(PARTED)
    const values = Object.fromEntries(keys)
    namings.push({
      pageTypeSlug: page.slice(0, cut),
      slug: page.slice(cut + 1),
      path: read.at,
      values,
      merge: true,
    })
    for (const [key, was] of keys)
      report.push(`restored\t${read.at}\t${key}\t${JSON.stringify(was)}`)
  }
  for (const [page, keys] of appended) {
    const read = reading.pageOf(page)
    if (read === null) return unpaged(page)
    for (const key of keys) {
      const file = reading.beside(read, key)
      if (file === null)
        return { refused: `\`${page}\` keeps \`${key}\` in no file a cancel can take lines from` }
      const lines = file.text.split(BREAK).filter((one) => one.trim() !== "")
      const kept = lines.filter((one) => turnOf(one) !== position)
      rewritten.push({ at: file.at, kept: kept.length === 0 ? "" : `${kept.join(BREAK)}${BREAK}` })
      report.push(`taken back\t${file.at}\tturn ${position}`)
    }
  }
  const removed: string[] = []
  for (const page of made) {
    const read = reading.pageOf(page)
    if (read === null) continue
    removed.push(read.at)
    report.push(`removed\t${read.at}`)
  }
  return { namings, rewritten, removed, report }
}
