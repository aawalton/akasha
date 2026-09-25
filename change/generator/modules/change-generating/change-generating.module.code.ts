import { existsSync } from "node:fs"
import { join } from "node:path"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { costRecorded, opening } from "akasha/check/modules/cost/check-cost.module.code.ts"
import {
  bodyFor,
  heldOver,
} from "akasha/code/body/modules/body-loading/body-loading.module.code.ts"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { type Shadow, shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const CHANGE_GENERATOR = "change-generator"

const NAMED = `${CHANGE_GENERATOR}/`

const GENERATES = "generateChange"

const TURNS = "couldTurn"

const RUNS_AFTER = "runsAfter"

const CODE = "code"

const HELD = "ts"

const GENERATE = "generate"

export type Generated = {
  readonly edits: readonly FileChange[]
  readonly said: readonly string[]
  readonly refused?: readonly string[]
}

type Generating = (change: Change) => Generated

type Turning = (change: Change) => boolean

export type Listed = {
  readonly slug: string
  readonly page: string
  readonly beside: string
  readonly at: string | null
  readonly runsAfter: readonly string[]
}

export type Loaded =
  | { readonly generating: Generating; readonly turning?: Turning }
  | { readonly missing: string }

type Loading = (change: Change, at: string, beside: string) => Loaded

type Ran = Generated & { readonly refused: readonly string[] }

type Again = (made: readonly FileChange[]) => Change

type Costing = (one: Listed, running: () => Ran) => Ran

const NOTHING: Ran = { edits: [], said: [], refused: [] }

const uncosted: Costing = (_one, running) => running()

export function orderedIn(
  listed: readonly Listed[]
): { readonly order: readonly Listed[] } | { readonly refused: string } {
  const bySlug = new Map(listed.map((one) => [one.slug, one]))
  const waiting = new Map<string, Set<string>>()
  for (const one of listed) {
    waiting.set(one.slug, new Set(one.runsAfter.filter((slug) => bySlug.has(slug))))
  }
  const order: Listed[] = []
  while (waiting.size > 0) {
    const ready = [...waiting].filter(([, after]) => after.size === 0).map(([slug]) => slug)
    if (ready.length === 0) {
      const ring = [...waiting.keys()].sort().map((slug) => `\`${slug}\``)
      return { refused: `the change generators ${ring.join(", ")} run after each other in a ring` }
    }
    const next = ready.sort()[0] as string
    waiting.delete(next)
    for (const after of waiting.values()) after.delete(next)
    order.push(bySlug.get(next) as Listed)
  }
  return { order }
}

export function generatedAlong(
  listed: readonly Listed[],
  change: Change,
  again: Again,
  loading: Loading,
  costing: Costing = uncosted
): Ran {
  const ordered = orderedIn(listed)
  if ("refused" in ordered) return { ...NOTHING, refused: [ordered.refused] }
  const edits: FileChange[] = []
  const said: string[] = []
  const refused: string[] = []
  let seen = change
  let seenOver = 0
  const handed = (one: Listed): Change => {
    if (one.runsAfter.length === 0) return change
    if (seenOver !== edits.length) {
      seen = again(edits)
      seenOver = edits.length
    }
    return seen
  }
  for (const one of ordered.order) {
    if (one.at === null) {
      refused.push(`\`${one.slug}\` states code at \`${one.beside}\`, and nothing is there`)
      continue
    }
    const loaded = loading(change, one.at, one.beside)
    if ("missing" in loaded) {
      refused.push(`\`${one.slug}\` gave no change generator — ${loaded.missing}`)
      continue
    }
    const over = handed(one)
    const got = costing(one, () => ranOne(one, loaded, over))
    edits.push(...got.edits)
    said.push(...got.said)
    refused.push(...got.refused)
  }
  return { edits, said, refused }
}

function ranOne(
  one: Listed,
  loaded: { readonly generating: Generating; readonly turning?: Turning },
  over: Change
): Ran {
  try {
    if (loaded.turning !== undefined && !loaded.turning(over)) return NOTHING
    const got = loaded.generating(over)
    return { edits: got.edits, said: got.said, refused: got.refused ?? [] }
  } catch (thrown) {
    return { ...NOTHING, refused: [`\`${one.slug}\` broke — ${saidBy(thrown)}`] }
  }
}

function costedIn(root: string): Costing {
  return (one, running) => {
    const before = opening()
    const ran = running()
    if (existsSync(join(root, one.page))) {
      costRecorded(root, one.page, before, GENERATE, one.slug, ran.edits.length, ran.refused.length)
    }
    return ran
  }
}

function codeIn(shadow: Shadow, change: Change, beside: string): string | null {
  const at = shadow.codeAt(beside)
  if (at !== null) return at
  return bodyFor(change, beside) === null ? null : beside
}

function listedIn(shadow: Shadow, change: Change): readonly Listed[] {
  const found: Listed[] = []
  for (const one of shadow.index.everyOfType(CHANGE_GENERATOR)) {
    const value = shadow.pageOf(one.path)
    if (value === null) continue
    const slug = textAt(value, "slug")
    const beside = besideAt(one.path, CODE, HELD)
    if (slug === null || beside === null) continue
    const runsAfter = (textsAt(value, RUNS_AFTER) ?? []).map((named) =>
      named.startsWith(NAMED) ? named.slice(NAMED.length) : named
    )
    found.push({ slug, page: one.path, beside, at: codeIn(shadow, change, beside), runsAfter })
  }
  return found
}

function loadedIn(change: Change, at: string, beside: string): Loaded {
  let held: Record<string, unknown>
  try {
    held = heldOver(change, at, bodyFor(change, beside))
  } catch (thrown) {
    return { missing: saidBy(thrown) }
  }
  const generating = held[GENERATES]
  if (typeof generating !== "function") return { missing: `it answers to no \`${GENERATES}\`` }
  const turning = held[TURNS]
  if (typeof turning !== "function") return { generating: generating as Generating }
  return { generating: generating as Generating, turning: turning as Turning }
}

export function generatedWhole(
  change: Change,
  shadow: Shadow,
  again: Again
): Ran & { readonly weighed: number } {
  const listed = listedIn(shadow, change)
  if (listed.length === 0) return { ...NOTHING, weighed: 0 }
  const ran = generatedAlong(
    listed,
    change,
    again,
    (asked, at, beside) => {
      const loaded = loadedIn(asked, at, beside)
      return "missing" in loaded ? loaded : { generating: loaded.generating }
    },
    costedIn(change.root)
  )
  return { ...ran, weighed: listed.length }
}

export function generatedOver(change: Change, again: Again): Ran {
  const cast = shadowFor(change)
  if ("refused" in cast) return NOTHING
  const listed = listedIn(cast.shadow, change)
  if (listed.length === 0) return NOTHING
  return generatedAlong(listed, change, again, loadedIn, costedIn(change.root))
}
