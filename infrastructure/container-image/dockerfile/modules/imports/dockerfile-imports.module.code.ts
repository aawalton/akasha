import { existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { pathsListed } from "akasha/change/modules/tree-searching/tree-searching.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import type { Body } from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const SOURCE_EXTENSIONS = [".ts", ".tsx", ".mts", ".js", ".jsx", ".mjs"] as const

const SRC = "src"

const MODULES = "node_modules/"

export type Seen = {
  readonly index: Answering
  readonly bodyAt: Body
  readonly under: (folder: string) => readonly string[]
}

function listedUnder(root: string, folder: string): readonly string[] {
  const at = join(root, folder)
  if (!existsSync(at)) return []
  return pathsListed(at).map((one) => `${folder}/${one}`)
}

export function seenIn(change: Change, index: Answering): Seen {
  return {
    index,
    bodyAt: (path) => textOf(change.after(path)),
    under: (folder) => {
      const held = new Set(listedUnder(change.root, folder))
      for (const path of change.changed) {
        if (!path.startsWith(`${folder}/`)) continue
        if (change.after(path) === null) held.delete(path)
        else held.add(path)
      }
      return [...held].sort()
    },
  }
}

function isTestOrDeclaration(relPath: string): boolean {
  return relPath.endsWith(".d.ts") || /\.test\.tsx?$/.test(relPath)
}

function isSourceFile(path: string): boolean {
  return SOURCE_EXTENSIONS.some((ext) => path.endsWith(ext)) && !path.endsWith(".d.ts")
}

function dotted(path: string): boolean {
  return path.split("/").some((one) => one.startsWith("."))
}

export function listEntryRoots(appDir: string, seen: Seen): readonly string[] {
  const inSrc = seen.under(`${appDir}/${SRC}`)
  const held = inSrc.length > 0 ? inSrc : seen.under(appDir)
  return held
    .filter(
      (one) =>
        isSourceFile(one) && !isTestOrDeclaration(one) && !one.includes(MODULES) && !dotted(one)
    )
    .sort()
}

function foldedDirs(files: readonly string[], appDir: string): readonly string[] {
  const held = new Set<string>()
  for (const file of files) {
    if (file.startsWith(`${appDir}/`)) continue
    const at = dirname(file)
    if (at === ".") continue
    held.add(at)
  }
  const every = [...held]
  return every
    .filter((one) => !every.some((two) => two !== one && one.startsWith(`${two}/`)))
    .sort((a, b) => a.localeCompare(b))
}

export function collectExecutedDeps(appDir: string, seen: Seen): readonly string[] {
  const bodies = new Map<string, string | null>()
  const bodyAt = (path: string): string | null => {
    if (bodies.has(path)) return bodies.get(path) ?? null
    const body = seen.bodyAt(path)
    bodies.set(path, body)
    return body
  }
  const reached = closureOf(imports, listEntryRoots(appDir, seen), {
    index: seen.index,
    bodyAt,
    through: (one) => isSourceFile(one) && bodyAt(one) !== null,
  })
  return foldedDirs(reached, appDir)
}
