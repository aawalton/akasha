import { dirname } from "node:path"
import { lineOf, parsedAs } from "@akasha/code/code-source"
import { partedIn } from "@akasha/pages/page-file-name"
import type { Shadow } from "@akasha/pages/shadow"
import ts from "typescript"
import {
  type Body,
  bodyOf,
  FILES,
  judgingEach,
  type Selector,
} from "../../../modules/change-walking/change-walking.module.code.ts"

const PACKAGE = "workspace-package"

const CHECK = "check"

const PAGE_TYPE = "page-type"

const CLUSTER = "cluster-check"

const RULE = "syntax-rule"

const CODE = "code"

const PARTED_BY = "/"

const MOST = 60

const SAID = "a check asks the index where a page sits rather than spelling that place"

export type Asking = (said: string) => string | null

function shortened(said: string): string {
  return said.length > MOST ? `${said.slice(0, MOST)}…` : said
}

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

export function askingOver(paths: readonly string[]): Asking {
  const based = basedOn([...paths, ...foldersOf(paths)])
  return (said) => {
    if (!said.includes(PARTED_BY)) return null
    if (said.startsWith(PARTED_BY) || said.startsWith(".")) return null
    const at = said.endsWith(PARTED_BY) ? said.slice(0, -PARTED_BY.length) : said
    const base = at.slice(at.lastIndexOf(PARTED_BY) + 1)
    for (const one of based.get(base) ?? []) {
      if (one === at || one.endsWith(`${PARTED_BY}${at}`)) return one
    }
    return null
  }
}

function specified(node: ts.Node): boolean {
  const up = node.parent
  if (up === undefined) return false
  if (ts.isImportDeclaration(up) || ts.isExportDeclaration(up)) return up.moduleSpecifier === node
  if (ts.isLiteralTypeNode(up)) return up.parent !== undefined && ts.isImportTypeNode(up.parent)
  return ts.isCallExpression(up) && up.expression.kind === ts.SyntaxKind.ImportKeyword
}

export function reasonsIn(asking: Asking, path: string, text: string): readonly string[] {
  const source = parsedAs(path, text)
  const said: string[] = []
  const visit = (node: ts.Node): undefined => {
    if (
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
      !specified(node)
    ) {
      const at = asking(node.text)
      if (at !== null) {
        said.push(
          `line ${lineOf(source, node)} spells \`${shortened(node.text)}\`, ` +
            `where \`${at}\` sits — ${SAID}`
        )
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return said
}

function folderOf(shadow: Shadow, pageTypeSlug: string, slug: string): string {
  const one = shadow.index.listedAt(pageTypeSlug, slug)[0]
  if (one === undefined) {
    throw new Error(
      `the index names no \`${pageTypeSlug}${PARTED_BY}${slug}\`, so no check is found`
    )
  }
  return `${dirname(one.path)}${PARTED_BY}`
}

export function judgedBy(shadow: Shadow): (path: string) => boolean {
  const at = folderOf(shadow, PACKAGE, CHECK)
  const cluster = folderOf(shadow, PAGE_TYPE, CLUSTER)
  const rule = folderOf(shadow, PAGE_TYPE, RULE)
  const types = shadow.index.pageTypesIn()
  return (path) => {
    if (!path.startsWith(at) || path.startsWith(cluster) || path.startsWith(rule)) return false
    const said = partedIn(path)
    if (said === null || !types.has(said.pageType)) return false
    return said.sections.length === 1 && said.sections[0] === CODE
  }
}

const JUDGED = new WeakMap<Shadow, (path: string) => boolean>()

function judgedFor(shadow: Shadow): (path: string) => boolean {
  const found = JUDGED.get(shadow)
  if (found !== undefined) return found
  const made = judgedBy(shadow)
  JUDGED.set(shadow, made)
  return made
}

const ASKING = new WeakMap<Shadow, Asking>()

function askingFor(shadow: Shadow): Asking {
  const found = ASKING.get(shadow)
  if (found !== undefined) return found
  const made = askingOver(shadow.index.everyPath())
  ASKING.set(shadow, made)
  return made
}

export const CHECK_CODE: Selector<Body> = {
  named: "the code a check runs",
  isInput: (path, shadow) => judgedFor(shadow)(path),
  from: (change, shadow) => FILES.from(change, shadow).filter((one) => judgedFor(shadow)(one.path)),
}

export const checkReachesAPathThroughTheIndex = judgingEach(CHECK_CODE, (given, shadow) =>
  reasonsIn(askingFor(shadow), given.path, bodyOf(given))
)
