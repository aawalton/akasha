import { writeFileSync } from "node:fs"
import { gitBytes } from "@akasha/git/git-capping"

export function difference(prior: string, now: string, workspace: string): string | null {
  const base = `${workspace}/base`
  const head = `${workspace}/head`
  writeFileSync(base, prior)
  writeFileSync(head, now)
  const run = gitBytes(workspace, ["diff", "--no-index", "--unified=1", "--", base, head])
  if (run.code !== 1) return null
  const lines = new TextDecoder().decode(run.stdout).split("\n")
  const at = lines.findIndex((line) => line.startsWith("@@ "))
  if (at === -1) return null
  return ["--- as you last read it", "+++ as it stands now", ...lines.slice(at)]
    .join("\n")
    .trimEnd()
}
