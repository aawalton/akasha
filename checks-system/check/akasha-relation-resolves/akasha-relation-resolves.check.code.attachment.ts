import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join, relative, resolve } from "node:path"
import { corpusIn } from "../../../akasha/write-system/corpus.module.code.ts"
import { relationFindings } from "../../../akasha/checks-system/check/relation-resolves/relation-resolves.check.code.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

const AKASHA = "akasha"

function standIn(root: string, paths: readonly string[], at: (p: string) => Buffer | null): string {
  const under = resolve(root, AKASHA)
  const dir = mkdtempSync(join(tmpdir(), "akasha-relations-"))
  for (const path of paths) {
    const body = at(path)
    if (body === null) continue
    const to = resolve(dir, relative(under, path))
    mkdirSync(dirname(to), { recursive: true })
    writeFileSync(to, body)
  }
  return dir
}

export const akashaRelationResolves: Check = {
  slug: "akasha-relation-resolves",
  needs: "tree",
  run: ({ root, tree }) => {
    const under = resolve(root, AKASHA)
    const paths = tree.paths().filter((one) => one.startsWith(`${under}/`) && one.endsWith(".ts"))
    if (paths.length === 0) return []
    const dir = standIn(root, paths, tree.at)
    try {
      const corpus = corpusIn(dir)
      if ("refused" in corpus) return [{ path: under, reason: corpus.refused }]
      return relationFindings(corpus).map(
        (one): CheckFailure => ({
          path: resolve(under, relative(dir, one.path)),
          reason: one.reason,
        })
      )
    } catch (thrown) {
      return [{ path: under, reason: thrown instanceof Error ? thrown.message : String(thrown) }]
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  },
}

export default akashaRelationResolves
