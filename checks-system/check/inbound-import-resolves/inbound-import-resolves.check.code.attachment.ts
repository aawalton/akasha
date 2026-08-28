import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { canonicalize } from "../../../repo/path/path.ts"
import { AKASHA, rootsHere } from "../../../repo/roots/roots.ts"
import { refusalText } from "../../../refusal/refusal.ts"
import type { Batch, Check, CheckFailure, Tree } from "../check-shape.ts"

const SLUG = "inbound-import-resolves"

const BUFFER_CEILING = 64 * 1024 * 1024

const CODE = ".ts"

const MARK = "akasha/"

const SPEC = /from "(\.[^"]+\.ts)"/g

function ranIn(root: string, args: readonly string[]): readonly string[] {
  try {
    return execFileSync("git", ["-C", root, ...args], { maxBuffer: BUFFER_CEILING })
      .toString("utf8")
      .split("\0")
      .flatMap((one) => one.split("\n"))
      .filter((one) => one !== "")
  } catch {
    return []
  }
}

function answersFor(paths: readonly string[], tree: Tree): boolean {
  if (paths.some((one) => one.endsWith(CODE))) return true
  const standing = new Set(tree.paths())
  for (const key of ranIn(tree.root, ["ls-tree", "-r", "HEAD", "--name-only"])) {
    if (key.endsWith(CODE) && !standing.has(`${tree.root}/${key}`)) return true
  }
  return false
}

function unresolvedIn(repo: string, root: string, tree: Tree): readonly string[] {
  const said: string[] = []
  const pending = tree.repointedElsewhere()
  const inside = `${canonicalize(root)}/`
  const here = new Set(ranIn(root, ["grep", "-l", "--fixed-strings", "--", MARK, "*.ts"]))
  for (const one of pending.keys()) if (one.startsWith(inside)) here.add(one.slice(inside.length))
  for (const key of here) {
    const at = `${root}/${key}`
    const proposed = pending.get(`${inside}${key}`)
    let text: string
    if (proposed !== undefined) text = proposed
    else {
      try {
        text = readFileSync(at, "utf8")
      } catch {
        continue
      }
    }
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
    if (!answersFor(paths, tree)) return []
    const failures: CheckFailure[] = []
    for (const [repo, root] of Object.entries(rootsHere())) {
      if (repo === AKASHA || typeof root !== "string") continue
      for (const reason of unresolvedIn(repo, root, tree)) failures.push({ path: first, reason })
    }
    return failures
  },
}

export default inboundImportResolves
