import { basename } from "node:path"
import {
  type BodyOf,
  expanded,
  type FileChange,
  type Held,
  overlaid,
  pathsOf,
  replayed,
  spliced,
  splicedTo,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  appendEdits,
  bodyIn,
  keptEdits,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { bareOf } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

export type Kept = readonly FileChange[] | { readonly refused: string }

type Lifted = { readonly values: Value; readonly rest: readonly FileChange[] }

type Paged = { readonly at: string; readonly value: Value }

const OWN_KEYS: readonly string[] = ["id", "type", "slug"]

const PAGELESS = "the caller has no page, so none of its drafted edits was found"

function callerPage(root: string, agentId: string | null): string | null {
  return agentId === null || agentId === "" ? null : agentPathOf(root, agentId)
}

export function keptForTurn(root: string, agentId: string | null, turn: string): Kept {
  const page = callerPage(root, agentId)
  if (page === null) return { refused: PAGELESS }
  const wrong: string[] = []
  let moved: readonly FileChange[] = []
  const left = keptEdits(root, page, (had) => {
    if (had.length === 0) return had
    const into = appendEdits(root, turn, had)
    if (!("why" in into)) {
      moved = had
      return null
    }
    wrong.push(into.why)
    return had
  })
  if ("why" in left) return { refused: left.why }
  const why = wrong[0]
  return why === undefined ? moved : { refused: why }
}

export type Fit = "fits" | "rederived" | "landed" | { readonly unfit: string }

export type Fitting = {
  readonly rows: readonly FileChange[]
  readonly fits: readonly Fit[]
  readonly landed: number
}

type Step = {
  readonly row: FileChange
  readonly fit: Fit
  readonly grown: ReturnType<typeof expanded>
}

export function narrowed(one: FileChange): FileChange | null {
  if (one.kind !== "replace") return null
  const narrow = spliced(one.path, one.contentFrom, splicedTo(one.contentFrom, one.contentTo))[0]
  if (narrow?.kind !== "replace" || narrow.contentFrom === one.contentFrom) return null
  return { ...one, contentFrom: narrow.contentFrom, contentTo: narrow.contentTo }
}

function holding(body: BodyOf, one: FileChange): boolean {
  if (one.kind !== "replace" || one.contentTo === "") return false
  const text = body(one.path)
  return typeof text === "string" && text.includes(one.contentTo)
}

function stepped(one: FileChange, body: BodyOf): Step {
  const grown = expanded(one, body)
  if (!("refused" in grown)) return { row: one, fit: "fits", grown }
  const narrow = narrowed(one)
  if (narrow === null) return { row: one, fit: { unfit: grown.refused }, grown }
  if (holding(body, narrow)) return { row: narrow, fit: "landed", grown }
  const tried = expanded(narrow, body)
  if ("refused" in tried) return { row: one, fit: { unfit: grown.refused }, grown }
  return { row: narrow, fit: "rederived", grown: tried }
}

function stepsOver(rows: readonly FileChange[], textOf: BodyOf): readonly Step[] {
  const held = new Map<string, Held | null>()
  const body = overlaid(held, textOf)
  return rows.map((one) => {
    const step = stepped(one, body)
    const left = "refused" in step.grown || step.fit === "landed" ? null : step.grown.left
    if (left?.from !== undefined) held.set(left.from, null)
    if (left !== null) held.set(left.path, left.body)
    return step
  })
}

export function fittingOf(rows: readonly FileChange[], textOf: BodyOf): Fitting {
  const steps = stepsOver(rows, textOf)
  const fits = steps.map((one) => one.fit)
  if (fits.every((one) => one === "fits") || fits.some((one) => typeof one === "object")) {
    return { rows, fits, landed: 0 }
  }
  const kept = steps.filter((one) => one.fit !== "landed")
  return {
    rows: kept.map((one) => one.row),
    fits: kept.map((one) => one.fit),
    landed: steps.length - kept.length,
  }
}

export function fittedBeside(root: string, turn: string): Fitting | { readonly refused: string } {
  const found: { fitting: Fitting | null } = { fitting: null }
  const left = keptEdits(root, turn, (had) => {
    const fitting = fittingOf(had, bodyIn(root))
    found.fitting = fitting
    return fitting.rows
  })
  if ("why" in left) return { refused: left.why }
  return found.fitting ?? { rows: left.rows, fits: [], landed: 0 }
}

export function turnAtOf(root: string, named: string): string | null {
  return listedAt(root, storyTurnPlayed.slug, bareOf(named))[0]?.path ?? null
}

export function turnSlugOf(turn: string): string {
  return basename(turn).split(".")[0] ?? turn
}

export function unfitSaid(turn: string, at: number, why: string): string {
  const slug = turnSlugOf(turn)
  return (
    `kept edit ${String(at)} beside \`${turn}\` no longer fits: ${why} — ` +
    `\`akasha story turn kept list --turn ${slug}\` names every edit kept there, and ` +
    `\`akasha story turn kept drop --turn ${slug} --record ${String(at)}\` takes this one away`
  )
}

export function heldForTurn(root: string, turn: string): Kept {
  const fitted = fittedBeside(root, turn)
  if ("refused" in fitted) return fitted
  const at = fitted.fits.findIndex((one) => typeof one === "object")
  const fit = fitted.fits[at]
  if (typeof fit !== "object") return fitted.rows
  return { refused: unfitSaid(turn, at + 1, fit.unfit) }
}

export type Dropped = { readonly went: FileChange; readonly left: number }

export function droppedBeside(
  root: string,
  turn: string,
  at: number
): Dropped | { readonly refused: string } {
  const found: { went: FileChange | null } = { went: null }
  const left = keptEdits(root, turn, (had) => {
    const went = had[at - 1]
    if (went === undefined) return had
    found.went = went
    return had.filter((_one, each) => each !== at - 1)
  })
  if ("why" in left) return { refused: left.why }
  if (found.went === null) {
    const many = String(left.rows.length)
    return { refused: `no kept edit ${String(at)} is beside \`${turn}\`, which keeps ${many}` }
  }
  return { went: found.went, left: left.rows.length }
}

export function withoutRows(
  had: readonly FileChange[],
  rows: readonly FileChange[]
): readonly FileChange[] {
  const left = [...had]
  for (const one of rows) {
    const narrow = narrowed(one)
    const said = [one, ...(narrow === null ? [] : [narrow])].map((each) => JSON.stringify(each))
    const at = left.findLastIndex((row) => said.includes(JSON.stringify(row)))
    if (at >= 0) left.splice(at, 1)
  }
  return left
}

export function unkeptFromTurn(
  root: string,
  turn: string,
  rows: readonly FileChange[]
): string | null {
  if (rows.length === 0) return null
  const left = keptEdits(root, turn, (had) => withoutRows(had, rows))
  return "why" in left ? left.why : null
}

export function givenBack(
  root: string,
  agentId: string | null,
  turn: string,
  rows: readonly FileChange[]
): string | null {
  if (rows.length === 0) return null
  const page = callerPage(root, agentId)
  if (page === null) return PAGELESS
  const taken = unkeptFromTurn(root, turn, rows)
  if (taken !== null) return taken
  const into = appendEdits(root, page, rows)
  return "why" in into ? into.why : null
}

export function liftedFrom(
  turn: Paged,
  kept: readonly FileChange[],
  textOf: () => string
): Lifted | { readonly refused: string } {
  const own = kept.filter((one) => pathsOf(one).includes(turn.at))
  if (own.length === 0) return { values: {}, rest: kept }
  const played = replayed(stating(own), (path) => (path === turn.at ? textOf() : null))
  if ("refused" in played) {
    return { refused: `a recorder's kept edit no longer fits \`${turn.at}\`: ${played.refused}` }
  }
  const body = played.get(turn.at)
  const value = typeof body === "string" ? valueIn(body) : null
  if (value === null) return { refused: `the recorders' kept edits leave \`${turn.at}\` no page` }
  const values: Record<string, unknown> = {}
  for (const [key, one] of Object.entries(value)) {
    if (OWN_KEYS.includes(key)) continue
    if (JSON.stringify(one) !== JSON.stringify(turn.value[key])) values[key] = one
  }
  return { values, rest: kept.filter((one) => !own.includes(one)) }
}
