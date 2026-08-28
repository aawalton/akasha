import { dirname, resolve } from "node:path"
import ts from "typescript"
import { textAt } from "../../../page/text/text.ts"
import { packagesFor, pathOf } from "../../../workspace-package/packages.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import fileNodeProducer, { FILE_NODE_KIND } from "../../node-producer/file/file.graph-node-producer.code.attachment.ts"
import type { BuildContext, SaidName } from "../../build-context/build-context.ts"
import type { NodeRef } from "../../node-producer/node-shape.ts"
import { aliasedTo } from "./tsconfig-paths.ts"
import { namedBy } from "../../node-producer/file/file.graph-node-producer.code.attachment.ts"
import { oidsUnder } from "../../../repo/oid/oid.ts"

export const IMPORT_EDGE = "import"

export const IMPORT_SAID: SaidName = {
  name: "import",
  entry: "graph/edge-producer/import/import.graph-edge-producer.code.attachment.ts",
}

const TYPESCRIPT: ReadonlySet<string> = new Set(["ts", "tsx"])

const RELATIVE = "."

const TAILS: readonly string[] = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"]

const ADDRESS_JOIN = "/"

const REACHING = new WeakMap<BuildContext, ReadonlyMap<string, readonly EdgeInit[]> | null>()

export function namedIn(text: string): readonly string[] {
  const said = ts.preProcessFile(text, true, true)
  return [...new Set(said.importedFiles.map((one) => one.fileName))]
}

function refAt(ctx: BuildContext, at: string): NodeRef | null {
  for (const [repo, root] of Object.entries(ctx.roots)) {
    if (typeof root !== "string") continue
    const within = `${root}/`
    if (!at.startsWith(within)) continue
    return { repo, key: at.slice(within.length) }
  }
  return null
}

function specifiersFor(
  ctx: BuildContext,
  root: string,
  repo: string,
  key: string
): readonly string[] {
  const held = ctx.said.of(IMPORT_SAID, repo, key, () => {
    const text = textAt(root, key)
    return text === null ? null : namedIn(text)
  })
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export function basesOf(root: string, from: string, named: string): readonly string[] {
  if (named.startsWith(RELATIVE)) return [resolve(dirname(from), named)]
  const within = pathOf(packagesFor(root), named)
  if (within !== null) return [resolve(root, within)]
  return aliasedTo(root, from, named)
}

function fileAt(ctx: BuildContext, base: string): NodeRef | null {
  for (const tail of TAILS) {
    const ref = refAt(ctx, `${base}${tail}`)
    if (ref === null) continue
    if (fileNodeProducer.at(ctx, ref) === null) continue
    return ref
  }
  return null
}

function atOf(ref: NodeRef): string {
  return `${ref.repo}${ADDRESS_JOIN}${ref.key}`
}

function specifiersIn(held: unknown): readonly string[] {
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

function reachingOver(ctx: BuildContext): ReadonlyMap<string, readonly EdgeInit[]> | null {
  const held = ctx.said.held(IMPORT_SAID)
  if (held === null) return null
  const found = new Map<string, EdgeInit[]>()
  for (const [repo, root] of Object.entries(ctx.roots)) {
    if (typeof root !== "string") continue
    for (const [key, oid] of oidsUnder(root, null)) {
      const extension = namedBy(key)["file-extension"]
      if (extension === null || !TYPESCRIPT.has(extension)) continue
      if (!held.has(oid)) return null
      const from = resolve(root, key)
      for (const named of specifiersIn(held.get(oid))) {
        for (const base of basesOf(root, from, named)) {
          const to = fileAt(ctx, base)
          if (to === null) continue
          const edge: EdgeInit = { kind: IMPORT_EDGE, from: { repo, key }, to, attrs: {} }
          const there = found.get(atOf(to))
          if (there === undefined) found.set(atOf(to), [edge])
          else there.push(edge)
          break
        }
      }
    }
  }
  return found
}

function reachingIn(ctx: BuildContext): ReadonlyMap<string, readonly EdgeInit[]> | null {
  const held = REACHING.get(ctx)
  if (held !== undefined && held !== null) return held
  const made = reachingOver(ctx)
  REACHING.set(ctx, made)
  return made
}

export const importEdgeProducer: EdgeProducer = {
  name: "import",
  edgeKinds: () => [IMPORT_EDGE],
  from: (ctx, file) => {
    if (file.kind !== FILE_NODE_KIND) return []
    const extension = file.attrs["file-extension"]
    if (extension === null || !TYPESCRIPT.has(extension)) return []
    const root = ctx.roots[file.repo]
    if (root === undefined) return []
    const from = resolve(root, file.key)
    const edges: EdgeInit[] = []
    for (const named of specifiersFor(ctx, root, file.repo, file.key)) {
      for (const base of basesOf(root, from, named)) {
        const ref = fileAt(ctx, base)
        if (ref === null) continue
        edges.push({
          kind: IMPORT_EDGE,
          from: { repo: file.repo, key: file.key },
          to: ref,
          attrs: {},
        })
        break
      }
    }
    return edges
  },
  into: (ctx, ref) => {
    const reaching = reachingIn(ctx)
    if (reaching === null) return null
    return reaching.get(atOf(ref)) ?? []
  },
}

export default importEdgeProducer
