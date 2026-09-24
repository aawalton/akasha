import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
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

export type Generated = {
  readonly edits: readonly FileChange[]
  readonly said: readonly string[]
}

export type Generating = (change: Change) => Generated

export type Turning = (change: Change) => boolean

export type Listed = {
  readonly slug: string
  readonly beside: string
  readonly at: string | null
  readonly runsAfter: readonly string[]
}

export type Loaded =
  | { readonly generating: Generating; readonly turning?: Turning }
  | { readonly missing: string }

export type Loading = (change: Change, at: string, beside: string) => Loaded

export type Ran = Generated & { readonly refused: readonly string[] }

export type Again = (made: readonly FileChange[]) => Change

const NOTHING: Ran = { edits: [], said: [], refused: [] }

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
  loading: Loading
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
    try {
      if (loaded.turning !== undefined && !loaded.turning(over)) continue
      const got = loaded.generating(over)
      edits.push(...got.edits)
      said.push(...got.said)
    } catch (thrown) {
      refused.push(`\`${one.slug}\` broke — ${saidBy(thrown)}`)
    }
  }
  return { edits, said, refused }
}

export function listedIn(shadow: Shadow): readonly Listed[] {
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
    found.push({ slug, beside, at: shadow.codeAt(beside), runsAfter })
  }
  return found
}

export function loadedIn(change: Change, at: string, beside: string): Loaded {
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

export function generatedOver(change: Change, again: Again): Ran {
  const cast = shadowFor(change)
  if ("refused" in cast) return NOTHING
  const listed = listedIn(cast.shadow)
  if (listed.length === 0) return NOTHING
  return generatedAlong(listed, change, again, loadedIn)
}
