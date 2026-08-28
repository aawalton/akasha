import { edgesInto, nodesIn } from "../../graph/ask.ts"
import { type BuildContext, KEEPS_NOTHING } from "../../graph/build-context/build-context.ts"
import { IMPORT_EDGE } from "../../graph/edge-producer/import/import.graph-edge-producer.code.attachment.ts"
import type { FileNode } from "../../graph/node-producer/file/file.graph-node-producer.code.attachment.ts"
import { AKASHA, rootsHere } from "../../repo/roots/roots.ts"
import { ROOT_FOLDER, folderOf } from "../section.ts"

const CODE = /\.tsx?$/

const APART = "editor-extension"

type From = { readonly repo: string; readonly key: string }

export type Held = {
  readonly files: string[]
  readonly code: string[]
  readonly subs: Set<string>
  readonly deep: string[]
}

export type Folders = {
  readonly held: ReadonlyMap<string, Held>
  readonly enters: (folder: string, key: string) => boolean
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

export function named(folder: string, keys: Iterable<string>): string {
  const cut = folder === ROOT_FOLDER ? 0 : folder.length + 1
  return [...keys].map((key) => key.slice(cut)).sort().join(", ")
}

export function namedFew(folder: string, keys: Iterable<string>, most: number): string {
  const all = [...keys]
  if (all.length <= most) return named(folder, all)
  return `${named(folder, all.slice().sort().slice(0, most))}, and ${all.length - most} more`
}

function foldersOf(keys: readonly string[]): ReadonlyMap<string, Held> {
  const held = new Map<string, Held>()
  const entryOf = (folder: string): Held => {
    const found = held.get(folder)
    if (found !== undefined) return found
    const made = { files: [], code: [], subs: new Set<string>(), deep: [] }
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
    const here = entryOf(home)
    here.files.push(key)
    if (CODE.test(key)) here.code.push(key)
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

export function foldersHere(): Folders {
  const ctx = { roots: rootsHere(), said: KEEPS_NOTHING }
  const nodes = nodesIn(ctx, [AKASHA]).filter((one) => !apart(one.key))
  const held = foldersOf(nodes.map((one) => one.key))
  const importers = importersOf(ctx, nodes)
  const enters = (folder: string, key: string): boolean =>
    (importers.get(key) ?? []).some((one) => one.repo !== AKASHA || !inside(folder, one.key))
  return { held, enters }
}
