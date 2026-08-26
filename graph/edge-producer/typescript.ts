import { dirname, resolve } from "node:path"
import { textAt } from "../../page/text.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import fileNodeProducer from "../node-producer/file.ts"
import type { BuildContext, NodeRef } from "../node-shape.ts"

export const IMPORT_EDGE = "import"

export const TYPESCRIPT_SAID = "typescript"

const TYPESCRIPT = "ts"

const RELATIVE = "."

const FROM = /\bfrom\s*["']([^"']+)["']/g

const BARE = /^\s*import\s*["']([^"']+)["']/gm

const DYNAMIC = /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g

const TAILS: readonly string[] = ["", ".ts", "/index.ts"]

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

function relativeIn(ctx: BuildContext, root: string, repo: string, key: string): readonly string[] {
  const held = ctx.said.of(TYPESCRIPT_SAID, repo, key, () => {
    const text = textAt(root, key)
    return text === null ? null : namedIn(text).filter((one) => one.startsWith(RELATIVE))
  })
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export const typescriptEdgeProducer: EdgeProducer = {
  name: "typescript",
  edgeKinds: () => [IMPORT_EDGE],
  from: (ctx, file) => {
    if (file.attrs["file-extension"] !== TYPESCRIPT) return []
    const root = ctx.roots[file.repo]
    if (root === undefined) return []
    const from = resolve(root, file.key)
    const edges: EdgeInit[] = []
    for (const named of relativeIn(ctx, root, file.repo, file.key)) {
      for (const tail of TAILS) {
        const ref = refAt(ctx, resolve(dirname(from), `${named}${tail}`))
        if (ref === null) continue
        if (fileNodeProducer.at(ctx, ref) === null) continue
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
