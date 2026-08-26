import { resolve } from "node:path"
import { edgesInto, nodesIn } from "../../../graph/ask.ts"
import { type BuildContext, KEEPS_NOTHING } from "../../../graph/build-context/build-context.ts"
import { IMPORT_EDGE } from "../../../graph/edge-producer/typescript/typescript.ts"
import { ROOT_FOLDER, folderOf } from "../../../file-structure/section.ts"
import type { FileNode } from "../../../graph/node-producer/file/file.ts"
import { AKASHA, rootsHere } from "../../../repo/roots/roots.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

const CODE = /\.tsx?$/

const APART = "editor-extension"

type From = { readonly repo: string; readonly key: string }

type Held = {
  readonly code: string[]
  readonly subs: Set<string>
  readonly deep: string[]
}

function apart(key: string): boolean {
  return key === APART || key.startsWith(`${APART}/`)
}

function inside(folder: string, key: string): boolean {
  return folder === ROOT_FOLDER || key.startsWith(`${folder}/`)
}

function chainTo(folder: string): readonly string[] {
  const out = [ROOT_FOLDER]
  if (folder === ROOT_FOLDER) return out
  let at = ""
  for (const part of folder.split("/")) {
    at = at === "" ? part : `${at}/${part}`
    out.push(at)
  }
  return out
}

function named(folder: string, keys: Iterable<string>): string {
  const cut = folder === ROOT_FOLDER ? 0 : folder.length + 1
  return [...keys].map((key) => key.slice(cut)).sort().join(", ")
}

function foldersOf(keys: readonly string[]): ReadonlyMap<string, Held> {
  const held = new Map<string, Held>()
  const entryOf = (folder: string): Held => {
    const found = held.get(folder)
    if (found !== undefined) return found
    const made = { code: [], subs: new Set<string>(), deep: [] }
    held.set(folder, made)
    return made
  }
  for (const key of keys) {
    const home = folderOf(key)
    const chain = chainTo(home)
    for (let step = 0; step < chain.length; step++) {
      const folder = chain[step] as string
      const one = entryOf(folder)
      const next = chain[step + 1]
      if (next === undefined) continue
      one.subs.add(next)
      if (CODE.test(key)) one.deep.push(key)
    }
    if (CODE.test(key)) entryOf(home).code.push(key)
  }
  return held
}

function importersOf(ctx: BuildContext, nodes: readonly FileNode[]): ReadonlyMap<string, From[]> {
  const refs = nodes.map((one) => ({ repo: one.repo, key: one.key }))
  const found = new Map<string, From[]>()
  for (const edge of edgesInto(ctx, refs, Object.keys(ctx.roots), [IMPORT_EDGE])) {
    const one = { repo: edge.from.repo, key: edge.from.key }
    const held = found.get(edge.to.key)
    if (held === undefined) found.set(edge.to.key, [one])
    else held.push(one)
  }
  return found
}

export const folderShape = {
  slug: "folder-shape",
  needs: "tree",
  cached: false,
  run: ({ root }) => {
    const ctx = { roots: rootsHere(), said: KEEPS_NOTHING }
    const nodes = nodesIn(ctx, [AKASHA]).filter((one) => !apart(one.key))
    const held = foldersOf(nodes.map((one) => one.key))
    const importers = importersOf(ctx, nodes)
    const enters = (folder: string, key: string): boolean =>
      (importers.get(key) ?? []).some((one) => one.repo !== AKASHA || !inside(folder, one.key))
    const failures: CheckFailure[] = []
    for (const folder of [...held.keys()].sort()) {
      const one = held.get(folder) as Held
      const at = resolve(root, folder)
      const doors = one.code.filter((key) => enters(folder, key))
      if (doors.length > 1) {
        failures.push({ path: at, reason: `is entered at ${doors.length} files rather than one: ${named(folder, doors)}` })
      }
      if (one.subs.size > 0 && one.code.length > 1) {
        failures.push({
          path: at,
          reason: `holds ${one.code.length} code files beside its ${one.subs.size} subfolders rather than one: ${named(folder, one.code)}`,
        })
      }
      if (one.deep.length > 0 && !one.deep.some((key) => enters(folder, key))) {
        failures.push({
          path: at,
          reason: `holds ${one.subs.size} subfolders and nothing outside this folder enters any of them: ${named(folder, one.subs)}`,
        })
      }
    }
    return failures
  },
} satisfies Check

export default folderShape
