import { typeScripted } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"
import { formattedBody } from "akasha/code/running/modules/code-format/code-format.module.code.ts"
import { textOf } from "akasha/command/modules/body-reaching/body-reaching.module.code.ts"
import ts from "typescript"

export type Interior = {
  readonly start: number
  readonly end: number
}

export type Moved = {
  readonly path: string
  readonly was: Uint8Array | null
  readonly now: Uint8Array | null
}

export function judgedHere(path: string): boolean {
  return typeScripted(path)
}

const textIn = textOf

function interiorOf(source: ts.SourceFile, node: ts.Node): Interior | null {
  const opened = ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)
  if (opened || ts.isTemplateTail(node)) {
    return { start: node.getStart(source) + 1, end: node.end - 1 }
  }
  if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node)) {
    return { start: node.getStart(source) + 1, end: node.end - 2 }
  }
  return null
}

export function interiorsIn(path: string, body: string): readonly Interior[] {
  const source = parsedAs(path, body)
  const found: Interior[] = []
  const visit = (node: ts.Node): undefined => {
    const one = interiorOf(source, node)
    if (one !== null) found.push(one)
    ts.forEachChild(node, visit)
  }
  visit(source)
  return found
}

export function spliced(was: string, into: readonly Interior[], said: readonly string[]): string {
  let held = was
  for (let at = into.length - 1; at >= 0; at -= 1) {
    const one = into[at]
    const put = said[at]
    if (one === undefined || put === undefined) continue
    held = held.slice(0, one.start) + put + held.slice(one.end)
  }
  return held
}

function formattedOf(root: string, path: string, body: string): string {
  const done = formattedBody(root, path, new TextEncoder().encode(body))
  return new TextDecoder().decode(done.body)
}

export function movedMoreThanWords(
  root: string,
  path: string,
  was: string,
  now: string
): string | null {
  const mine = interiorsIn(path, was)
  const theirs = interiorsIn(path, now)
  if (mine.length !== theirs.length) {
    return (
      `${path} — the body held ${mine.length} runs of stated text before and ${theirs.length} after,` +
      " so this change adds one or takes one away rather than restating one"
    )
  }
  const put = theirs.map((one) => now.slice(one.start, one.end))
  const rebuilt = formattedOf(root, path, spliced(was, mine, put))
  if (rebuilt === formattedOf(root, path, now)) return null
  return (
    `${path} — this change moves more than the words the page states, so it is authored` +
    " rather than restated"
  )
}

export function unrestatedIn(root: string, moved: readonly Moved[]): readonly string[] {
  const said: string[] = []
  for (const one of moved) {
    if (one.now === null) {
      said.push(`${one.path} — a path taken away is no restatement`)
      continue
    }
    if (one.was === null) {
      said.push(`${one.path} — a path that is not there yet is written rather than restated`)
      continue
    }
    if (!judgedHere(one.path)) {
      said.push(`${one.path} — only a TypeScript body is judged a restatement`)
      continue
    }
    const was = textIn(one.was)
    const now = textIn(one.now)
    if (was === null || now === null) {
      said.push(`${one.path} — a body that is not text is no restatement`)
      continue
    }
    const why = movedMoreThanWords(root, one.path, was, now)
    if (why !== null) said.push(why)
  }
  return said
}
