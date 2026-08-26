import { dirname, resolve } from "node:path"
import { textAt } from "../../../instructions/tools/page/page-types.ts"
import type { EdgeInit, EdgeProducer } from "../edge-shape.ts"
import type { FileNode } from "../node-producer/file.ts"

export const IMPORT_EDGE = "import"

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

export const typescriptEdgeProducer: EdgeProducer = {
  name: "typescript",
  edgeKinds: [IMPORT_EDGE],
  build: (ctx, files) => {
    const standing = new Map<string, FileNode>()
    for (const file of files) {
      const root = ctx.roots[file.repo]
      if (root === undefined) continue
      standing.set(resolve(root, file.key), file)
    }
    const edges: EdgeInit[] = []
    for (const file of files) {
      if (file.attrs["file-extension"] !== TYPESCRIPT) continue
      const root = ctx.roots[file.repo]
      if (root === undefined) continue
      const text = textAt(root, file.key)
      if (text === null) continue
      const from = resolve(root, file.key)
      for (const named of namedIn(text)) {
        if (!named.startsWith(RELATIVE)) continue
        for (const tail of TAILS) {
          const to = standing.get(resolve(dirname(from), `${named}${tail}`))
          if (to === undefined) continue
          edges.push({
            kind: IMPORT_EDGE,
            from: { repo: file.repo, key: file.key },
            to: { repo: to.repo, key: to.key },
          })
          break
        }
      }
    }
    return edges
  },
}

export default typescriptEdgeProducer
