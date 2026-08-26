import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { AKASHA, rootsHere } from "../../../repo/roots.ts"
import { refusalText } from "../../refusal/refusal.ts"
import type { Batch, Check, CheckFailure, Tree } from "../check-shape.ts"

const SLUG = "inbound-import-resolves"

const BUFFER_CEILING = 64 * 1024 * 1024

const MARK = "akasha/"

const SPEC = /from "(\.[^"]+\.ts)"/g

function reachingIn(root: string): readonly string[] {
  try {
    return execFileSync("git", ["-C", root, "grep", "-l", "--", MARK, "*.ts"], {
      maxBuffer: BUFFER_CEILING,
    })
      .toString("utf8")
      .split("\n")
      .filter((one) => one !== "")
  } catch {
    return []
  }
}

function unresolvedIn(repo: string, root: string, tree: Tree): readonly string[] {
  const said: string[] = []
  for (const key of reachingIn(root)) {
    const at = `${root}/${key}`
    let text: string
    try {
      text = readFileSync(at, "utf8")
    } catch {
      continue
    }
    if (!text.includes(MARK)) continue
    for (const found of text.matchAll(SPEC)) {
      const target = resolve(dirname(at), found[1] as string)
      if (!target.startsWith(`${tree.root}/`)) continue
      if (tree.at(target) !== null) continue
      said.push(
        refusalText("inbound-import-unresolved", {
          repo,
          importer: key,
          target: target.slice(tree.root.length + 1),
        })
      )
    }
  }
  return said
}

export const inboundImportResolves: Check = {
  slug: SLUG,
  needs: "tree",
  run: ({ paths, tree }: Batch): readonly CheckFailure[] => {
    const first = paths[0]
    if (first === undefined) return []
    const failures: CheckFailure[] = []
    for (const [repo, root] of Object.entries(rootsHere())) {
      if (repo === AKASHA || typeof root !== "string") continue
      for (const reason of unresolvedIn(repo, root, tree)) failures.push({ path: first, reason })
    }
    return failures
  },
}

export default inboundImportResolves
