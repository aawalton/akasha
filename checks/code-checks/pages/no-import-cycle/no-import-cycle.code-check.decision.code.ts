import {
  textIn,
  textNamed,
  textWas,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import {
  erasedExport,
  erasedImport,
  skimmedAs,
} from "akasha/code/source/code-source.module.code.ts"
import { landingOf } from "akasha/code/specifier/code-specifier.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"
import ts from "typescript"

const SHOWN = 3

const ITSELF = "no module under akasha imports its way back around to itself"

export function reachedIn(at: string, text: string): readonly string[] {
  const source = skimmedAs(at, text)
  const found: string[] = []
  for (const one of source.statements) {
    if (ts.isImportDeclaration(one)) {
      if (erasedImport(one.importClause) || !ts.isStringLiteral(one.moduleSpecifier)) continue
      found.push(one.moduleSpecifier.text)
      continue
    }
    if (!ts.isExportDeclaration(one)) continue
    const said = one.moduleSpecifier
    if (said === undefined || !ts.isStringLiteral(said) || erasedExport(one)) continue
    found.push(said.text)
  }
  return found
}

export type Edge = {
  readonly from: string
  readonly to: string
}

const AFTER = new WeakMap<Change, Map<string, readonly string[]>>()

function landedIn(
  at: string,
  text: string | null,
  stands: (path: string) => boolean
): readonly string[] {
  if (text === null) return []
  const outs: string[] = []
  for (const one of reachedIn(at, text)) {
    const landed = landingOf(at, one)
    if (landed === null || outs.includes(landed) || !textNamed(landed)) continue
    if (!stands(landed)) continue
    outs.push(landed)
  }
  return outs
}

function reachedAfter(change: Change, at: string): readonly string[] {
  let held = AFTER.get(change)
  if (held === undefined) {
    held = new Map()
    AFTER.set(change, held)
  }
  const found = held.get(at)
  if (found !== undefined) return found
  const made = landedIn(at, textIn(change, at), (path) => textIn(change, path) !== null)
  held.set(at, made)
  return made
}

function reachedBefore(change: Change, at: string): readonly string[] {
  return landedIn(at, textWas(change, at), (path) => textWas(change, path) !== null)
}

export function reachingIn(change: Change): ReadonlyMap<string, readonly string[]> {
  const held = new Set(change.changed.filter((one) => textNamed(one)))
  const found = new Map<string, readonly string[]>()
  const ahead = [...held].sort()
  let at = 0
  while (at < ahead.length) {
    const path = ahead[at]
    at += 1
    if (path === undefined || found.has(path)) continue
    const outs = reachedAfter(change, path)
    found.set(path, outs)
    for (const one of outs) {
      if (held.has(one)) continue
      held.add(one)
      ahead.push(one)
    }
  }
  return found
}

export function addedIn(change: Change): readonly Edge[] {
  const said: Edge[] = []
  for (const from of change.changed) {
    if (!textNamed(from)) continue
    const now = reachedAfter(change, from)
    if (now.length === 0) continue
    const was = new Set(reachedBefore(change, from))
    for (const to of now) {
      if (was.has(to)) continue
      said.push({ from, to })
    }
  }
  return said
}

function heldBack(came: ReadonlyMap<string, string>, edge: Edge): readonly string[] {
  const held: string[] = [edge.from]
  let at = came.get(edge.from)
  while (at !== undefined) {
    held.push(at)
    at = came.get(at)
  }
  return held
}

function cycleFor(change: Change, edge: Edge): readonly string[] | null {
  if (edge.to === edge.from) return [edge.from]
  const came = new Map<string, string>()
  const seen = new Set<string>([edge.to])
  const queue: string[] = [edge.to]
  let at = 0
  while (at < queue.length) {
    const one = queue[at]
    at += 1
    if (one === undefined) continue
    for (const next of reachedAfter(change, one)) {
      if (seen.has(next)) continue
      seen.add(next)
      came.set(next, one)
      if (next === edge.from) return heldBack(came, edge)
      queue.push(next)
    }
  }
  return null
}

export function cyclesIn(
  reaching: ReadonlyMap<string, readonly string[]>
): readonly (readonly string[])[] {
  let counted = 0
  const index = new Map<string, number>()
  const low = new Map<string, number>()
  const onStack = new Set<string>()
  const stack: string[] = []
  const found: string[][] = []
  const walk = (at: string): undefined => {
    index.set(at, counted)
    low.set(at, counted)
    counted += 1
    stack.push(at)
    onStack.add(at)
    for (const next of reaching.get(at) ?? []) {
      if (!index.has(next)) {
        walk(next)
        low.set(at, Math.min(low.get(at) ?? 0, low.get(next) ?? 0))
        continue
      }
      if (onStack.has(next)) low.set(at, Math.min(low.get(at) ?? 0, index.get(next) ?? 0))
    }
    if (low.get(at) !== index.get(at)) return
    const held: string[] = []
    let said: string | undefined
    do {
      said = stack.pop()
      if (said === undefined) break
      onStack.delete(said)
      held.push(said)
    } while (said !== at)
    if (held.length > 1 || (reaching.get(at) ?? []).includes(at)) found.push([...held].sort())
  }
  for (const at of [...reaching.keys()].sort()) if (!index.has(at)) walk(at)
  return found
}

function reasonFor(at: string, held: readonly string[]): string {
  const others = held.filter((one) => one !== at)
  if (others.length === 0) return `imports itself — ${ITSELF}`
  const first = namesDrawn(others.slice(0, SHOWN))
  const rest = others.length > SHOWN ? `, and ${others.length - SHOWN} more` : ""
  return `sits in a cycle reaching ${first}${rest} — ${ITSELF}`
}

export function refusalsOver(change: Change): readonly Judged[] {
  const carried = new Set(change.changed)
  const said: Judged[] = []
  for (const held of cyclesIn(reachingIn(change))) {
    if (!held.some((one) => carried.has(one))) continue
    for (const path of held) said.push({ path, reason: reasonFor(path, held) })
  }
  return said.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}

export function refusalsAdded(change: Change): readonly Judged[] {
  const said = new Map<string, Judged>()
  for (const edge of addedIn(change)) {
    const found = cycleFor(change, edge)
    if (found === null) continue
    const held = [...found].sort()
    for (const path of held) {
      if (said.has(path)) continue
      said.set(path, { path, reason: reasonFor(path, held) })
    }
  }
  return [...said.values()].sort((one, two) =>
    one.path < two.path ? -1 : one.path > two.path ? 1 : 0
  )
}
