import { execFileSync } from "node:child_process"
import { resolve } from "node:path"
import type { Check, CheckRun } from "../check-shape.ts"
import { onDisk } from "../tree.ts"
import { runAll } from "./all.ts"

const BUFFER_CEILING = 64 * 1024 * 1024

export function everyFileIn(root: string): readonly string[] {
  const out = execFileSync("git", ["-C", root, "ls-files", "-z"], { maxBuffer: BUFFER_CEILING })
  return out
    .toString("utf8")
    .split("\0")
    .filter((one) => one !== "")
    .map((relPath) => resolve(root, relPath))
}

export function runAudit(checks: readonly Check[], root: string): readonly CheckRun[] {
  return runAll(checks, everyFileIn(root), onDisk(root))
}
