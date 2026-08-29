import ts from "typescript"
import { everyOfType } from "../../../pages-system/index/index-reading.module.code.ts"
import { besideAt } from "../../../pages-system/page/page-file-name.module.code.ts"
import type { Body } from "../../checking.module.code.ts"
import { bodyOf } from "../../checking.module.code.ts"
import type { Judged, Leaving } from "../../judging.module.code.ts"

const MODULE = "module"

const CODE = "code"

const HELD = "ts"

const TS = ".ts"

export type Spelt = {
  readonly name: string
  readonly rule: string
  readonly exported: boolean
}

export type Owner = {
  readonly path: string
  readonly name: string
}

function bound(fn: ts.FunctionLikeDeclaration): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  const take = (name: string): void => {
    if (!found.has(name)) found.set(name, `$${found.size}`)
  }
  for (const one of fn.parameters) if (ts.isIdentifier(one.name)) take(one.name.text)
  const walk = (node: ts.Node): void => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) take(node.name.text)
    if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
      for (const one of node.parameters) if (ts.isIdentifier(one.name)) take(one.name.text)
    }
    ts.forEachChild(node, walk)
  }
  if (fn.body !== undefined) walk(fn.body)
  return found
}

export function ruleOf(fn: ts.FunctionLikeDeclaration, source: ts.SourceFile): string | null {
  if (fn.body === undefined) return null
  const names = bound(fn)
  const said: string[] = []
  const emit = (node: ts.Node): void => {
    const kids = node.getChildren(source)
    if (kids.length > 0) {
      for (const kid of kids) emit(kid)
      return
    }
    const text = node.getText(source)
    if (text === "") return
    said.push(ts.isIdentifier(node) ? (names.get(node.text) ?? text) : text)
  }
  for (const one of fn.parameters) emit(one)
  said.push("=>")
  emit(fn.body)
  return said.join(" ")
}

function exported(node: ts.Node): boolean {
  const held = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
  if (held?.some((one) => one.kind === ts.SyntaxKind.ExportKeyword) === true) return true
  const up = node.parent
  if (up !== undefined && ts.isVariableDeclarationList(up) && up.parent !== undefined) {
    return exported(up.parent)
  }
  return false
}

export function speltIn(path: string, text: string): readonly Spelt[] {
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const found: Spelt[] = []
  const walk = (node: ts.Node): void => {
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      const rule = ruleOf(node, source)
      if (rule !== null) found.push({ name: node.name.text, rule, exported: exported(node) })
    }
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer !== undefined &&
      (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
    ) {
      const rule = ruleOf(node.initializer, source)
      if (rule !== null) found.push({ name: node.name.text, rule, exported: exported(node) })
    }
    ts.forEachChild(node, walk)
  }
  walk(source)
  return found
}

export function textIn(leaving: Leaving, path: string): string | null {
  const bytes = leaving.at(path)
  if (bytes === null) return null
  const given: Body = { root: leaving.root, path, bytes }
  return bodyOf(given)
}

export function ownedIn(leaving: Leaving): ReadonlyMap<string, Owner> {
  const found = new Map<string, Owner>()
  for (const one of everyOfType(leaving.root, MODULE)) {
    const at = besideAt(one.path, CODE, HELD)
    if (at === null) continue
    const text = textIn(leaving, at)
    if (text === null) continue
    for (const each of speltIn(at, text)) {
      if (each.exported && !found.has(each.rule))
        found.set(each.rule, { path: at, name: each.name })
    }
  }
  return found
}

export function reasonsIn(
  path: string,
  text: string,
  owned: ReadonlyMap<string, Owner>
): readonly string[] {
  const said: string[] = []
  for (const one of speltIn(path, text)) {
    const by = owned.get(one.rule)
    if (by === undefined || by.path === path) continue
    said.push(
      `\`${one.name}\` spells again what \`${by.name}\` in ${by.path} already says — import it ` +
        "rather than saying it twice"
    )
  }
  return said
}

export function noSecondSpelling(leaving: Leaving): readonly Judged[] {
  const owned = ownedIn(leaving)
  const said: Judged[] = []
  for (const path of leaving.changed) {
    if (!path.endsWith(TS)) continue
    const text = textIn(leaving, path)
    if (text === null) continue
    for (const reason of reasonsIn(path, text, owned)) said.push({ path, reason })
  }
  return said
}
