import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { basename, dirname, resolve } from "node:path"
import { AKASHA, rootsHere } from "../../../repo/roots.ts"
import { refusalText } from "../../refusal/refusal.ts"
import type { Batch, Check, CheckFailure } from "../check-shape.ts"

const SLUG = "inbound-import-resolves"

const BUFFER_CEILING = 64 * 1024 * 1024

const CODE = ".ts"

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

function goneFrom(root: string, standing: ReadonlySet<string>): ReadonlySet<string> {
  const gone = new Set<string>()
  for (const key of ranIn(root, ["ls-tree", "-r", "HEAD", "--name-only"])) {
    if (!key.endsWith(CODE)) continue
    const at = `${root}/${key}`
    if (!standing.has(at)) gone.add(at)
  }
  return gone
}

function reachingIn(root: string, names: readonly string[]): readonly string[] {
  const args = ["grep", "-l", "--fixed-strings"]
  for (const name of names) args.push("-e", name)
  return ranIn(root, [...args, "--", "*.ts"])
}

export const inboundImportResolves: Check = {
  slug: SLUG,
  needs: "tree",
  run: ({ paths, tree }: Batch): readonly CheckFailure[] => {
    const first = paths[0]
    if (first === undefined) return []
    const gone = goneFrom(tree.root, new Set(tree.paths()))
    if (gone.size === 0) return []
    const names = [...new Set([...gone].map((at) => basename(at)))]
    const failures: CheckFailure[] = []
    for (const [repo, root] of Object.entries(rootsHere())) {
      if (repo === AKASHA || typeof root !== "string") continue
      for (const key of reachingIn(root, names)) {
        const at = `${root}/${key}`
        let text: string
        try {
          text = readFileSync(at, "utf8")
        } catch {
          continue
        }
        for (const found of text.matchAll(SPEC)) {
          const target = resolve(dirname(at), found[1] as string)
          if (!gone.has(target)) continue
          failures.push({
            path: first,
            reason: refusalText("inbound-import-unresolved", {
              repo,
              importer: key,
              target: target.slice(tree.root.length + 1),
            }),
          })
        }
      }
    }
    return failures
  },
}

export default inboundImportResolves
