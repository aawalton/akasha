import { resolve } from "node:path"
import ts from "typescript"
import { textIn } from "../../../code-system/body-text/body-text.module.code.ts"
import { lineAt, parsedAs } from "../../../code-system/code-source/code-source.module.code.ts"
import {
  compiled,
  insideOf,
  programOver,
  readingOf,
} from "../../../code-system/code-typing/code-typing.module.code.ts"
import { reachingInto } from "../../../graph-system/graph-asking/graph-asking.module.code.ts"
import { importEdge } from "../../../graph-system/graph-edge/graph-edges/import-edge.graph-edge.ts"
import type { Change } from "../../../pages-system/change/change.module.code.ts"
import { waitingKeys } from "../../../pages-system/indexes/generated-properties/generated-properties.module.code.ts"
import { pageTypesIn } from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import type { Reading } from "../../../pages-system/indexes/index-shape/index-shape.module.code.ts"
import { pageNamed } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"

const IMPORT = importEdge.slug

const ELSEWHERE = "the akasha folder does not compile as this change leaves it"

const OMIT = "Omit"

export type Found = {
  readonly path: string
  readonly reason: string
}

export function reachedBy(change: Change, reading?: Reading): readonly string[] {
  return reachingInto(change.root, change.changed, [IMPORT], compiled, reading)
}

export function rootsOf(change: Change, reading?: Reading): readonly string[] {
  return reachedBy(change, reading).filter((one) => change.after(one) !== null)
}

export type Minting = (path: string, text: string) => string

export function omittingIn(path: string, text: string, keys: readonly string[]): string | null {
  if (keys.length === 0) return null
  const held = keys.map((one) => JSON.stringify(one)).join(" | ")
  const source = parsedAs(path, text)
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    for (const declared of statement.declarationList.declarations) {
      const said = declared.initializer
      if (said === undefined || !ts.isSatisfiesExpression(said)) continue
      const at = said.type.getStart(source)
      const to = said.type.getEnd()
      return `${text.slice(0, at)}${OMIT}<${text.slice(at, to)}, ${held}>${text.slice(to)}`
    }
  }
  return null
}

export function mintingIn(
  change: Change,
  keys: readonly string[],
  given: string | Reading
): Minting {
  const pageTypes = keys.length === 0 ? null : pageTypesIn(given)
  return (path, text) => {
    if (pageTypes === null || !pageNamed(path, pageTypes)) return text
    if (change.before(path) !== null) return text
    return omittingIn(path, text, keys) ?? text
  }
}

export function bodiesOf(change: Change, minting: Minting): (at: string) => string | undefined {
  const root = resolve(change.root)
  const held = new Map<string, string | undefined>()
  const base = readingOf(root, (rel) => {
    const bytes = change.after(rel)
    return bytes === null ? null : minting(rel, textIn(bytes))
  })
  return (path) => {
    const at = resolve(path)
    if (held.has(at)) return held.get(at)
    const said = base(at)
    held.set(at, said)
    return said
  }
}

export function foundOf(root: string, said: ts.Diagnostic): Found {
  const text = ts.flattenDiagnosticMessageText(said.messageText, " ")
  if (said.file === undefined || said.start === undefined) {
    throw new Error(
      `the compiler said \`TS${said.code}: ${text}\`, which names no file it could be kept against`
    )
  }
  const line = lineAt(said.file, said.start)
  const at = insideOf(root, resolve(said.file.fileName))
  return {
    path: at ?? said.file.fileName,
    reason: `line ${line}: TS${said.code}: ${text}`,
  }
}

export function foundIn(change: Change, shadow: Shadow): readonly Found[] {
  const roots = rootsOf(change, shadow.reading)
  if (roots.length === 0) return []
  const root = resolve(change.root)
  const keys = [...waitingKeys(shadow)]
  const read = bodiesOf(change, mintingIn(change, keys, shadow.reading))
  const program = programOver(root, roots, read)
  const held = new Map<string, ts.SourceFile>()
  for (const file of program.getSourceFiles()) {
    const at = insideOf(root, resolve(file.fileName))
    if (at !== null) held.set(at, file)
  }
  const found: Found[] = []
  for (const one of roots) {
    const file = held.get(one)
    if (file === undefined) continue
    const said = [...program.getSyntacticDiagnostics(file), ...program.getSemanticDiagnostics(file)]
    for (const diagnostic of said) found.push(foundOf(root, diagnostic))
  }
  return found
}

export function typecheck(change: Change, shadow: Shadow): readonly Judged[] {
  const changed = new Set(change.changed)
  const seen = new Set<string>()
  const said: Judged[] = []
  for (const one of foundIn(change, shadow)) {
    const key = `${one.path}\n${one.reason}`
    if (seen.has(key)) continue
    seen.add(key)
    const reason = changed.has(one.path) ? one.reason : `${one.reason} — ${ELSEWHERE}`
    said.push({ path: one.path, reason })
  }
  return said
}
