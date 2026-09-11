import { dirname } from "node:path"
import { parsedAs } from "akasha/code-system/code-source/code-source.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import ts from "typescript"
import { textNamed } from "../change-walking/change-walking.module.code.ts"

export const APP = "router-app"

const PARTED_BY = "/"

const SERVER_NAMED = /\.server(\.[cm]?[jt]sx?)?$/

const SERVER_FOLDER = /(^|\/)\.server\//

const MODULE_NAMED = /\.[cm]?[jt]sx?$/

const FOLDERS = new WeakMap<Shadow, readonly string[]>()

export function folderOf(path: string): string {
  const at = dirname(path)
  return at === "." ? "" : `${at}${PARTED_BY}`
}

export function serverNamed(said: string): boolean {
  return SERVER_NAMED.test(said) || SERVER_FOLDER.test(said)
}

export function modulesIn(path: string, text: string): readonly string[] {
  const source = parsedAs(path, text)
  const found: string[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isStringLiteral(node) && MODULE_NAMED.test(node.text)) found.push(node.text)
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(source, visit)
  return found
}

export function foldersFor(shadow: Shadow): readonly string[] {
  const found = FOLDERS.get(shadow)
  if (found !== undefined) return found
  const made = [...new Set(shadow.index.everyOfType(APP).map((one) => folderOf(one.path)))]
  FOLDERS.set(shadow, made)
  return made
}

export function insideAnApp(path: string, shadow: Shadow): boolean {
  return textNamed(path) && foldersFor(shadow).some((one) => path.startsWith(one))
}
