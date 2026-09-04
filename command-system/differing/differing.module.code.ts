import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { bytes, ran } from "@akasha/utils-run/running"
import { SCRATCH_AT } from "../scratching/scratching.module.code.ts"

const OBJECT_ID = /^[0-9a-f]{40,64}$/

const DIFFERING_AT = "akasha-differing-"

const BEFORE = "before"

const AFTER = "after"

const WAS_READ = "--- as you last read it"

const IS_NOW = "+++ as it stands now"

const HUNK = "@@ "

const DIFFERED = 1

export function bodyRead(root: string, oid: string): Uint8Array | null {
  if (!OBJECT_ID.test(oid)) return null
  const run = bytes(["git", "-C", root, "cat-file", "blob", oid])
  if (run.code !== 0) return null
  return run.out
}

function saidOver(dir: string): string | null {
  const run = ran([
    "git",
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
  ])
  return run.code === DIFFERED ? run.out : null
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
