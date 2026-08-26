import { execFileSync } from "node:child_process"
import type { Input } from "./mark.ts"

const BUFFER_CEILING = 64 * 1024 * 1024

const UNDER = ["checks/check", "checks/check-shape.ts"]

export function closureOf(root: string, index: string): readonly Input[] {
  const listed = execFileSync("git", ["-C", root, "ls-files", "-s", "-z", "--", ...UNDER], {
    maxBuffer: BUFFER_CEILING,
    env: { ...process.env, GIT_INDEX_FILE: index },
  })
  const inputs: Input[] = []
  for (const line of listed.toString("utf8").split("\0")) {
    if (line === "") continue
    const [meta, path] = line.split("\t")
    const oid = meta?.split(" ")[1]
    if (oid === undefined || path === undefined) continue
    if (!path.endsWith(".ts")) continue
    inputs.push({ path, oid })
  }
  return inputs
}
