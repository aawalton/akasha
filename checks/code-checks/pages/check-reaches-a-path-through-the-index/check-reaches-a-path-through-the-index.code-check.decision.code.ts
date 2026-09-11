import {
  type Specified,
  specifyingIn,
} from "akasha/checks/code-checks/pages/check-reaches-a-path-through-the-index/modules/specifier-placing/specifier-placing.module.code.ts"
import { lineOf, parsedAs } from "akasha/code-system/code-source/code-source.module.code.ts"
import { typed } from "akasha/code-system/code-typing/code-typing.module.code.ts"
import { runsIn } from "akasha/code-system/path-runs/path-runs.module.code.ts"
import { partedIn, uncommittedHeld } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { shortened } from "akasha/utils/text/shortened/shortened.module.code.ts"
import ts from "typescript"

const CODE = "code"

const TEST = "test"

const PARTED_BY = "/"

const SAID = "what sits under a path the index answers for is asked rather than listed"

const SPELT = "where a page the index answers for sits is asked rather than spelled"

const LISTED = "the pages of a page type are asked of the index rather than listed"

const LISTING: ReadonlySet<string> = new Set([
  "readdirSync",
  "readdir",
  "opendirSync",
  "opendir",
  "Glob",
  "glob",
  "globSync",
])

const LS_FILES = "ls-files"

const PARTED_AT = "."

const PARTED_UP = ".."

const SEGMENT = /^[a-z0-9-]+$/

export type Naming = (said: string) => string | null

function tailsOf(paths: readonly string[], types: ReadonlySet<string>): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of paths) {
    const parts = one.slice(one.lastIndexOf(PARTED_BY) + 1).split(PARTED_AT)
    for (let at = 1; at < parts.length; at += 1) {
      if (types.has(parts[at] ?? "")) found.add(parts.slice(at).join(PARTED_AT))
    }
  }
  return found
}

export function namingOver(paths: readonly string[], types: ReadonlySet<string>): Naming {
  const tails = tailsOf(paths, types)
  return (said) => {
    const parts = said.split(PARTED_AT)
    for (let at = 1; at < parts.length - 1; at += 1) {
      const one = parts[at]
      if (one === undefined || !types.has(one)) continue
      if (!parts.slice(at + 1).every((each) => SEGMENT.test(each))) continue
      if (tails.has(parts.slice(at).join(PARTED_AT))) return one
    }
    return null
  }
}

type Found = { readonly at: string; readonly page: boolean }

export type Asking = (said: string) => Found | null

export type Reaching = (from: string) => Asking

type Reached = { readonly said: string; readonly at: string; readonly page: boolean }

export function foldersOf(paths: readonly string[]): readonly string[] {
  const found = new Set<string>()
  for (const one of paths) {
    let at = one.lastIndexOf(PARTED_BY)
    while (at > 0) {
      found.add(one.slice(0, at))
      at = one.lastIndexOf(PARTED_BY, at - 1)
    }
  }
  return [...found]
}

export function basedOn(paths: readonly string[]): ReadonlyMap<string, readonly string[]> {
  const found = new Map<string, string[]>()
  for (const one of paths) {
    const base = one.slice(one.lastIndexOf(PARTED_BY) + 1)
    const held = found.get(base)
    if (held === undefined) found.set(base, [one])
    else held.push(one)
  }
  return found
}

function sharedIn(from: string, one: string): number {
  const said = from.split(PARTED_BY)
  const held = one.split(PARTED_BY)
  let at = 0
  while (at < said.length && at < held.length && said[at] === held[at]) at += 1
  return at
}

function nearestTo(from: string, kept: readonly string[]): string {
  let best = kept[0] ?? ""
  let near = sharedIn(from, best)
  for (const one of kept) {
    const found = sharedIn(from, one)
    if (found > near) {
      best = one
      near = found
    }
  }
  return best
}

function reachedFrom(from: string, said: string): string | null {
  const parts = from.split(PARTED_BY)
  parts.pop()
  for (const one of said.split(PARTED_BY)) {
    if (one === "" || one === PARTED_AT) continue
    if (one !== PARTED_UP) {
      parts.push(one)
      continue
    }
    if (parts.length === 0) return null
    parts.pop()
  }
  return parts.length === 0 ? null : parts.join(PARTED_BY)
}

export function askingOver(paths: readonly string[]): Reaching {
  const pages = new Set(paths)
  const based = basedOn([...paths, ...foldersOf(paths)])
  return (from) => (said) => {
    if (!said.includes(PARTED_BY)) return null
    if (said.startsWith(PARTED_BY)) return null
    const closed = said.endsWith(PARTED_BY)
    const spelled = closed ? said.slice(0, -PARTED_BY.length) : said
    const reached = spelled.startsWith(PARTED_AT)
    const at = reached ? reachedFrom(from, spelled) : spelled
    if (at === null) return null
    const base = at.slice(at.lastIndexOf(PARTED_BY) + 1)
    const found: string[] = []
    for (const one of based.get(base) ?? []) {
      if (one === at || (!reached && one.endsWith(`${PARTED_BY}${at}`))) found.push(one)
    }
    if (found.length === 0) return null
    const paged = found.filter((each) => pages.has(each))
    const one = nearestTo(from, paged.length > 0 ? paged : found)
    return { at: one, page: !closed && pages.has(one) }
  }
}

function readingIn(said: string, asking: Asking): Reached | null {
  for (const run of runsIn(said)) {
    for (let at = 0; at < run.said.length; at += 1) {
      const one = run.said[at] ?? ""
      if (at > 0 && one.startsWith(PARTED_AT)) continue
      const found = asking(one)
      if (found !== null) return { said: one, at: found.at, page: found.page }
    }
  }
  return null
}

function namingIn(node: ts.Node, asking: Asking, specified: Specified): Reached | null {
  if (!ts.isStringLiteral(node) && !ts.isNoSubstitutionTemplateLiteral(node)) return null
  if (specified(node)) return null
  return readingIn(node.text, asking)
}

function reachedIn(
  node: ts.Node,
  asking: Asking,
  held: ReadonlyMap<string, Reached>,
  specified: Specified
): Reached | null {
  const own = namingIn(node, asking, specified)
  if (own !== null) return own
  if (ts.isIdentifier(node)) return held.get(node.text) ?? null
  if (ts.isPropertyAccessExpression(node)) {
    return reachedIn(node.expression, asking, held, specified)
  }
  return (
    ts.forEachChild(node, (one) => reachedIn(one, asking, held, specified) ?? undefined) ?? null
  )
}

function writtenIn(source: ts.SourceFile): ReadonlyMap<string, readonly ts.Expression[]> {
  const found = new Map<string, ts.Expression[]>()
  const keep = (name: ts.BindingName, from: ts.Expression): undefined => {
    if (ts.isIdentifier(name)) {
      const kept = found.get(name.text)
      if (kept === undefined) found.set(name.text, [from])
      else kept.push(from)
    }
  }
  const visit = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) {
      keep(node.name, node.initializer)
    }
    if (ts.isForOfStatement(node) && ts.isVariableDeclarationList(node.initializer)) {
      for (const one of node.initializer.declarations) keep(one.name, node.expression)
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

export function heldIn(
  source: ts.SourceFile,
  asking: Asking,
  specified: Specified
): ReadonlyMap<string, Reached> {
  const written = writtenIn(source)
  const held = new Map<string, Reached>()
  let more = true
  while (more) {
    more = false
    for (const [name, each] of written) {
      if (held.has(name)) continue
      for (const one of each) {
        const found = reachedIn(one, asking, held, specified)
        if (found === null) continue
        held.set(name, found)
        more = true
        break
      }
    }
  }
  return held
}

function calledAs(node: ts.Expression): string | null {
  if (ts.isIdentifier(node)) return node.text
  if (ts.isPropertyAccessExpression(node)) return node.name.text
  return null
}

function saidIn(node: ts.Node, want: string): boolean {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text === want
  }
  if (ts.isCallExpression(node) || ts.isNewExpression(node)) return false
  return ts.forEachChild(node, (one) => (saidIn(one, want) ? true : undefined)) ?? false
}

function listedBy(node: ts.Node): readonly ts.Expression[] | null {
  if (ts.isTaggedTemplateExpression(node)) {
    return saidIn(node.template, LS_FILES) ? [] : null
  }
  if (!ts.isCallExpression(node) && !ts.isNewExpression(node)) return null
  const args = [...(node.arguments ?? [])]
  const named = calledAs(node.expression)
  if (named !== null && LISTING.has(named)) return args
  return args.some((one) => saidIn(one, LS_FILES)) ? args : null
}

function codedIn(path: string): boolean {
  const said = partedIn(path)
  return said !== null && said.sections[said.sections.length - 1] === CODE
}

function typedIn(asking: Asking, naming: Naming, path: string, text: string): readonly string[] {
  const source = parsedAs(path, text)
  const specified = specifyingIn(source)
  const held = heldIn(source, asking, specified)
  const said: string[] = []
  const named: string[] = []
  const coded = codedIn(path)
  let lists = false
  const visit = (node: ts.Node): undefined => {
    const args = listedBy(node)
    if (args !== null) {
      lists = true
      for (const one of args) {
        const found = reachedIn(one, asking, held, specified)
        if (found === null || found.page) continue
        said.push(
          `line ${lineOf(source, node)} lists \`${shortened(found.said)}\`, ` +
            `where \`${found.at}\` sits — ${SAID}`
        )
        break
      }
    }
    const own = namingIn(node, asking, specified)
    if (own?.page === true) {
      said.push(
        `line ${lineOf(source, node)} spells \`${shortened(own.said)}\`, ` +
          `where the page \`${own.at}\` sits — ${SPELT}`
      )
    }
    if (coded && own === null && !specified(node)) {
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        const kind = naming(node.text)
        if (kind !== null) {
          named.push(
            `line ${lineOf(source, node)} spells the name of a \`${kind}\` page ` +
              `and this file lists a folder — ${LISTED}`
          )
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return lists ? [...said, ...named] : said
}

function ranIn(asking: Asking, text: string): readonly string[] {
  const said: string[] = []
  for (const run of runsIn(text)) {
    for (const one of run.said) {
      const found = asking(one)
      if (found === null || !found.page) continue
      said.push(
        `line ${run.line} spells \`${shortened(one)}\`, ` +
          `where the page \`${found.at}\` sits — ${SPELT}`
      )
      break
    }
  }
  return said
}

export function reasonsIn(
  reaching: Reaching,
  naming: Naming,
  path: string,
  text: string
): readonly string[] {
  const asking = reaching(path)
  return typed(path) ? typedIn(asking, naming, path, text) : ranIn(asking, text)
}

export function judgedBy(types: ReadonlySet<string>): (path: string) => boolean {
  return (path) => {
    const said = partedIn(path)
    if (said === null || !types.has(said.pageType)) return false
    const last = said.sections[said.sections.length - 1]
    return last === CODE || last === TEST
  }
}

export type Asked = {
  readonly types: ReadonlySet<string>
  readonly listed: (path: string) => boolean
  readonly generated: (path: string) => boolean
  readonly toolResolvesPaths: (path: string) => boolean
}

export function judgingOver(asked: Asked): (path: string) => boolean {
  const coded = judgedBy(asked.types)
  return (path) => {
    if (typed(path)) return coded(path)
    if (uncommittedHeld(path)) return false
    if (!asked.listed(path)) return false
    return !asked.generated(path) && !asked.toolResolvesPaths(path)
  }
}
