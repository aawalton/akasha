import { readFileSync } from "node:fs"
import type { BuildContext } from "../../build-context/build-context.ts"
import type { NodeProducer, NodeRef } from "../node-shape.ts"
import { keysIn } from "../file/file.graph-node-producer.code.attachment.ts"

export const FOLDER_NODE_KIND = "folder"

const ROOT_FOLDER = ""

const PACKAGE_FILE = "package.json"

export type FolderNodeAttrs = {
  readonly package: string | null
}

export type FolderNode = NodeRef & {
  readonly kind: typeof FOLDER_NODE_KIND
  readonly attrs: FolderNodeAttrs
}

const HELD = new WeakMap<BuildContext, Map<string, ReadonlyMap<string, FolderNodeAttrs>>>()

function folderOf(key: string): string {
  const cut = key.lastIndexOf("/")
  return cut < 0 ? ROOT_FOLDER : key.slice(0, cut)
}

function chainOf(key: string): readonly string[] {
  const out: string[] = [ROOT_FOLDER]
  const parts = folderOf(key).split("/").filter((one) => one !== "")
  let at = ""
  for (const part of parts) {
    at = at === "" ? part : `${at}/${part}`
    out.push(at)
  }
  return out
}

function namedPackage(root: string, folder: string): string {
  const at = folder === ROOT_FOLDER ? `${root}/${PACKAGE_FILE}` : `${root}/${folder}/${PACKAGE_FILE}`
  try {
    const said: unknown = JSON.parse(readFileSync(at, "utf8"))
    if (typeof said === "object" && said !== null) {
      const name = (said as Record<string, unknown>).name
      if (typeof name === "string" && name !== "") return name
    }
  } catch {}
  return folder === ROOT_FOLDER ? PACKAGE_FILE : folder
}

function foldersOver(ctx: BuildContext, repo: string, root: string): ReadonlyMap<string, FolderNodeAttrs> {
  const packaged = new Set<string>()
  const found = new Set<string>()
  for (const key of keysIn(ctx, repo, root)) {
    for (const folder of chainOf(key)) found.add(folder)
    if (key === PACKAGE_FILE || key.endsWith(`/${PACKAGE_FILE}`)) packaged.add(folderOf(key))
  }
  const made = new Map<string, FolderNodeAttrs>()
  for (const folder of found) {
    made.set(folder, { package: packaged.has(folder) ? namedPackage(root, folder) : null })
  }
  return made
}

function foldersIn(ctx: BuildContext, repo: string, root: string): ReadonlyMap<string, FolderNodeAttrs> {
  let held = HELD.get(ctx)
  if (held === undefined) {
    held = new Map()
    HELD.set(ctx, held)
  }
  const there = held.get(repo)
  if (there !== undefined) return there
  const made = foldersOver(ctx, repo, root)
  held.set(repo, made)
  return made
}

function nodeOf(repo: string, key: string, attrs: FolderNodeAttrs): FolderNode {
  return { kind: FOLDER_NODE_KIND, repo, key, attrs }
}

export const folderNodeProducer: NodeProducer<FolderNode> = {
  name: "folder",
  nodeKinds: [FOLDER_NODE_KIND],
  at: (ctx, ref) => {
    const root = ctx.roots[ref.repo]
    if (root === undefined) return null
    const attrs = foldersIn(ctx, ref.repo, root).get(ref.key)
    return attrs === undefined ? null : nodeOf(ref.repo, ref.key, attrs)
  },
  all: (ctx, repos) => {
    const nodes: FolderNode[] = []
    for (const repo of repos) {
      const root = ctx.roots[repo]
      if (root === undefined) continue
      for (const [key, attrs] of foldersIn(ctx, repo, root)) nodes.push(nodeOf(repo, key, attrs))
    }
    return nodes
  },
}

export default folderNodeProducer
