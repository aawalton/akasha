import { spawnSync } from "node:child_process"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { SCRATCH_AT } from "./scratching.module.code.ts"

const OBJECT_ID = /^[0-9a-f]{40,64}$/

const HELD_AT_MOST = 64 * 1024 * 1024

const DIFFERING_AT = "akasha-differing-"

const BEFORE = "before"

const AFTER = "after"

const WAS_READ = "--- as you last read it"

const IS_NOW = "+++ as it stands now"

const HUNK = "@@ "

const DIFFERED = 1

export function bodyRead(root: string, oid: string): Uint8Array | null {
  if (!OBJECT_ID.test(oid)) return null
  const run = spawnSync("git", ["-C", root, "cat-file", "blob", oid], { maxBuffer: HELD_AT_MOST })
  if (run.status !== 0 || run.stdout === null) return null
  return new Uint8Array(run.stdout)
}

function saidOver(dir: string): string | null {
  const run = spawnSync(
    "git",
    [
      "-C",
      dir,
      "diff",
      "--no-ext-diff",
      "--no-textconv",
      "--no-color",
      "--no-index",
      "--unified=1",
      "--",
      BEFORE,
      AFTER,
    ],
    { encoding: "utf8", maxBuffer: HELD_AT_MOST }
  )
  return run.status === DIFFERED && run.stdout !== null ? run.stdout : null
}

export function differenceOf(was: Uint8Array, now: Uint8Array): string | null {
  let dir: string | null = null
  try {
    dir = mkdtempSync(join(SCRATCH_AT, DIFFERING_AT))
    writeFileSync(join(dir, BEFORE), was)
    writeFileSync(join(dir, AFTER), now)
    const said = saidOver(dir)
    if (said === null) return null
    const lines = said.split("\n")
    const at = lines.findIndex((one) => one.startsWith(HUNK))
    if (at === -1) return null
    return [WAS_READ, IS_NOW, ...lines.slice(at)].join("\n").trimEnd()
  } catch {
    return null
  } finally {
    if (dir !== null) rmSync(dir, { recursive: true, force: true })
  }
}
