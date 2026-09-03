import { existsSync, readFileSync } from "node:fs"
import { join, posix } from "node:path"
import ts from "typescript"
import { z } from "zod"
import { listWorkspaceDirs } from "../workspace-dirs/workspace-dirs.module.code.ts"

const REFERENCE_SCHEMA = z.object({ path: z.string() }).passthrough()

const TSCONFIG_SCHEMA = z.object({ references: z.array(REFERENCE_SCHEMA).optional() }).passthrough()

const REFERENCES = "references"

const STATED = "path"

const OWN_NAME = "tsconfig.json"

const AT_ROOT = [OWN_NAME, "tsconfig.base.json"] as const

export function tsconfigsIn(repoRoot: string): readonly string[] {
  const found: string[] = []
  for (const name of AT_ROOT) {
    if (existsSync(join(repoRoot, name))) found.push(name)
  }
  for (const dir of listWorkspaceDirs(repoRoot)) {
    const rel = `${dir}/${OWN_NAME}`
    if (existsSync(join(repoRoot, rel))) found.push(rel)
  }
  return found
}

export function targetOf(tsconfigPath: string, stated: string): string | null {
  const joined = posix.normalize(posix.join(posix.dirname(tsconfigPath), stated))
  if (joined === ".." || joined.startsWith("../")) return null
  return joined === "." ? "" : joined
}

export function reaches(repoRoot: string, target: string): boolean {
  const abs = join(repoRoot, target)
  if (target.endsWith(".json")) return existsSync(abs)
  return existsSync(join(abs, OWN_NAME))
}

function heldIn(path: string, text: string): unknown {
  return ts.convertToObject(ts.parseJsonText(path, text), [])
}

export function statedIn(path: string, text: string): readonly string[] | null {
  const parsed = TSCONFIG_SCHEMA.safeParse(heldIn(path, text))
  if (!parsed.success) return null
  const held = parsed.data.references
  if (held === undefined) return null
  return held.map((one) => one.path)
}

export type Dangling = {
  readonly at: string
  readonly stated: string
  readonly target: string | null
}

export function danglingIn(repoRoot: string, tsconfigPath: string): readonly Dangling[] {
  const text = readFileSync(join(repoRoot, tsconfigPath), "utf-8")
  const stated = statedIn(tsconfigPath, text)
  if (stated === null) return []
  const found: Dangling[] = []
  for (const one of stated) {
    const target = targetOf(tsconfigPath, one)
    if (target !== null && reaches(repoRoot, target)) continue
    found.push({ at: tsconfigPath, stated: one, target })
  }
  return found
}

export function danglingOver(repoRoot: string): readonly Dangling[] {
  return tsconfigsIn(repoRoot).flatMap((one) => danglingIn(repoRoot, one))
}

export type Span = { readonly start: number; readonly end: number }

function spacing(here: string | undefined): boolean {
  return here === " " || here === "\t" || here === "\r" || here === "\n"
}

export function listEntrySpan(text: string, node: ts.Node): Span {
  const end = node.getEnd()
  let at = end
  while (at < text.length) {
    if (text[at] === ",") return { start: node.getFullStart(), end: at + 1 }
    if (!spacing(text[at])) break
    at = at + 1
  }
  return { start: node.getFullStart(), end }
}

export function reachingBack(text: string, from: number): number {
  let at = from - 1
  while (at >= 0) {
    if (text[at] === ",") return at
    if (!spacing(text[at])) return from
    at = at - 1
  }
  return from
}

function listedIn(source: ts.JsonSourceFile, key: string): ts.ArrayLiteralExpression | null {
  const first = source.statements[0]
  if (first === undefined || !ts.isExpressionStatement(first)) return null
  const held = first.expression
  if (!ts.isObjectLiteralExpression(held)) return null
  for (const one of held.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text !== key) continue
    return ts.isArrayLiteralExpression(one.initializer) ? one.initializer : null
  }
  return null
}

export function statedBy(node: ts.Node): string | null {
  if (!ts.isObjectLiteralExpression(node)) return null
  for (const one of node.properties) {
    if (!ts.isPropertyAssignment(one) || !ts.isStringLiteral(one.name)) continue
    if (one.name.text !== STATED) continue
    return ts.isStringLiteral(one.initializer) ? one.initializer.text : null
  }
  return null
}

export function withoutStated(path: string, text: string, dropping: ReadonlySet<string>): string {
  const source = ts.parseJsonText(path, text)
  const held = listedIn(source, REFERENCES)
  if (held === null) return text
  const elements = held.elements
  const going = elements.map((one) => {
    const stated = statedBy(one)
    return stated !== null && dropping.has(stated)
  })
  let tail = elements.length
  while (tail > 0 && going[tail - 1] === true) tail = tail - 1
  const spans: Span[] = []
  for (let at = 0; at < tail; at += 1) {
    const one = elements[at]
    if (one === undefined || going[at] !== true) continue
    spans.push(listEntrySpan(text, one))
  }
  const opening = elements[tail]
  const closing = elements[elements.length - 1]
  if (opening !== undefined && closing !== undefined) {
    spans.push({ start: reachingBack(text, opening.getFullStart()), end: closing.getEnd() })
  }
  let body = text
  for (const one of [...spans].sort((first, next) => next.start - first.start)) {
    body = `${body.slice(0, one.start)}${body.slice(one.end)}`
  }
  return body
}
