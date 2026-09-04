import { dirname, resolve } from "node:path"
import { textIn } from "@akasha/code-system/body-text"
import { lineAt, parsedAs } from "@akasha/code-system/code-source"
import {
  compiled,
  insideOf,
  linkedOf,
  manifested,
  programKeptOver,
  programOver,
  readingOf,
} from "@akasha/code-system/code-typing"
import { reachesIn } from "@akasha/code-system/package-manifest"
import { rootRoute } from "@akasha/code-system/router-app/root-route"
import { reachingInto } from "@akasha/graph/graph-asking"
import { importEdge } from "@akasha/graph/import-edge"
import type { Answering } from "@akasha/indexes/answering"
import { waitingKeys } from "@akasha/indexes/generated-properties"
import type { Change } from "@akasha/pages-system/change"
import { pageNamed } from "@akasha/pages-system/page-file-name"
import type { Shadow } from "@akasha/pages-system/shadow"
import ts from "typescript"
import type { Body, Selector } from "../../../modules/change-walking/change-walking.module.code.ts"
import {
  FILES,
  input,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const IMPORT = importEdge.slug

const ELSEWHERE = "the akasha folder does not compile as this change leaves it"

const OMIT = "Omit"

const ROUTER_APP = ".router-app.ts"

const ROUTES = "routes/"

const DECLARED = ".d.ts"

export type Found = {
  readonly path: string
  readonly reason: string
}

export function builtFrom(path: string): boolean {
  return textNamed(path) || manifested(path)
}

const BUILT: Selector<Body> = {
  named: "the bodies the program is built from",
  isInput: (path) => builtFrom(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => builtFrom(one.path)),
}

export function landingsIn(change: Change): readonly string[] {
  const found = new Set<string>()
  for (const at of change.changed) {
    if (!manifested(at)) continue
    const folder = dirname(at)
    for (const bytes of [change.before(at), change.after(at)]) {
      if (bytes === null) continue
      for (const [, path] of reachesIn(folder, textIn(bytes))) found.add(path)
    }
  }
  const held = [...found].filter((one) => change.before(one) !== null || change.after(one) !== null)
  return held.sort()
}

export function reachedBy(change: Change, index: Answering): readonly string[] {
  const seeds = [...change.changed, ...landingsIn(change)]
  return reachingInto(seeds, [IMPORT], index, compiled)
}

export function routingIn(index: Answering): readonly string[] {
  const found = new Set<string>()
  for (const one of index.everyPath()) {
    if (!one.endsWith(ROUTER_APP)) continue
    const app = dirname(one)
    found.add(`${app}/${ROUTES}`)
    found.add(`${app}/${rootRoute.fileName}`)
  }
  return [...found].sort()
}

export function routed(path: string, folders: readonly string[]): boolean {
  return folders.some((one) => path.startsWith(one))
}

export function rootsOf(change: Change, index: Answering): readonly string[] {
  const held = reachedBy(change, index).filter((one) => change.after(one) !== null)
  if (held.length === 0) return held
  const folders = routingIn(index)
  return held.filter((one) => !routed(one, folders))
}

export function wholeIn(named: ReadonlySet<string>, change: Change, index: Answering): boolean {
  const folders = routingIn(index)
  for (const one of index.everyPath()) {
    if (!compiled(one) || routed(one, folders) || named.has(one)) continue
    if (change.after(one) !== null) return false
  }
  return true
}

export function declaringIn(change: Change, index: Answering): readonly string[] {
  const held = index.everyPath()
  return held.filter((one) => compiled(one) && one.endsWith(DECLARED) && change.after(one) !== null)
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

export function mintingIn(change: Change, keys: readonly string[], index: Answering): Minting {
  const pageTypes = keys.length === 0 ? null : index.pageTypesIn()
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
    const at = linkedOf(root, resolve(path))
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
  const roots = rootsOf(change, shadow.index)
  if (roots.length === 0) return []
  const root = resolve(change.root)
  const keys = [...waitingKeys(shadow)]
  const read = bodiesOf(change, mintingIn(change, keys, shadow.index))
  const named = [...new Set([...roots, ...declaringIn(change, shadow.index)])]
  const whole = wholeIn(new Set(named), change, shadow.index)
  const program = whole ? programKeptOver(root, named, read) : programOver(root, named, read)
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

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
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

export const typecheck = input(BUILT, refusalsIn)
