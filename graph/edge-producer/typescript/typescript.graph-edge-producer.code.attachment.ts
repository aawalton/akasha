import { dirname, resolve } from "node:path"
import { textAt } from "../../../page/text/text.ts"
import { packagesFor, pathOf } from "../../../workspace-package/packages.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import fileNodeProducer, { FILE_NODE_KIND } from "../../node-producer/file/file.graph-node-producer.code.attachment.ts"
import type { BuildContext, SaidName } from "../../build-context/build-context.ts"
import type { NodeRef } from "../../node-producer/node-shape.ts"
import { aliasedTo } from "./tsconfig-paths.ts"

export const IMPORT_EDGE = "import"

export const TYPESCRIPT_SAID: SaidName = {
  name: "typescript",
  entry: "graph/edge-producer/typescript/typescript.graph-edge-producer.code.attachment.ts",
}

const TYPESCRIPT: ReadonlySet<string> = new Set(["ts", "tsx"])

const RELATIVE = "."

const FROM = /\bfrom\s*["']([^"']+)["']/g

const BARE = /^\s*import\s*["']([^"']+)["']/gm

const DYNAMIC = /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g

const TAILS: readonly string[] = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"]

export function namedIn(text: string): readonly string[] {
  const found = new Set<string>()
  for (const pattern of [FROM, BARE, DYNAMIC]) {
    for (const match of text.matchAll(pattern)) {
      const one = match[1]
      if (one !== undefined) found.add(one)
    }
  }
  return [...found]
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
  const held = ctx.said.of(TYPESCRIPT_SAID, repo, key, () => {
    const text = textAt(root, key)
    return text === null ? null : namedIn(text)
  })
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

/**
 * Every place one specifier could stand, in the order the compiler would try them.
 *
 * A relative specifier and a workspace package name each name ONE place, and a `paths` alias
 * names as many as its config lists. Aliases are asked last, so nothing a specifier already
 * resolved to moves.
 */
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

export const typescriptEdgeProducer: EdgeProducer = {
  name: "typescript",
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
}

export default typescriptEdgeProducer
