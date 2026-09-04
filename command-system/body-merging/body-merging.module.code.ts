import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { bytes } from "@akasha/utils-run/running"
import { SCRATCH_AT } from "../scratching/scratching.module.code.ts"

const MERGING_AT = "akasha-merge-file-"

const MINE = "mine"

const BASE = "base"

const THEIRS = "theirs"

const NOT_TEXT = 0

const CONFLICTED_AT_MOST = 127

const MINE_SAID = "what this change would leave"

const BASE_SAID = "what this change was built from"

const THEIRS_SAID = "what HEAD holds"

export const CLASH_MARK = `<<<<<<< ${MINE_SAID}`

export type Merged =
  | { readonly body: Uint8Array | null }
  | { readonly why: string; readonly marked?: Uint8Array }

export function sameBody(one: Uint8Array | null, two: Uint8Array | null): boolean {
  if (one === null || two === null) return one === two
  return Buffer.from(one).equals(Buffer.from(two))
}

export function clashing(body: string | null): boolean {
  return body?.split("\n").includes(CLASH_MARK) === true
}

function isText(body: Uint8Array): boolean {
  return !body.includes(NOT_TEXT)
}

function mergedByGit(base: Uint8Array, mine: Uint8Array, theirs: Uint8Array): Merged {
  const dir = mkdtempSync(join(SCRATCH_AT, MERGING_AT))
  try {
    writeFileSync(join(dir, MINE), mine)
    writeFileSync(join(dir, BASE), base)
    writeFileSync(join(dir, THEIRS), theirs)
    const said = bytes([
      "git",
      "merge-file",
      "-p",
      "-L",
      MINE_SAID,
      "-L",
      BASE_SAID,
      "-L",
      THEIRS_SAID,
      join(dir, MINE),
      join(dir, BASE),
      join(dir, THEIRS),
    ])
    if (said.code === 0) return { body: said.out }
    if (said.code > 0 && said.code <= CONFLICTED_AT_MOST) {
      const many = said.code === 1 ? "1 place" : `${String(said.code)} places`
      return {
        why: `it moved under this change in ${many} this change also moved, so the two cannot be merged`,
        marked: said.out,
      }
    }
    return { why: `\`git merge-file\` would not run — ${said.err.trim()}` }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export function mergedOnto(
  base: Uint8Array | null,
  mine: Uint8Array | null,
  theirs: Uint8Array | null
): Merged {
  if (sameBody(base, theirs)) return { body: mine }
  if (sameBody(mine, theirs)) return { body: mine }
  if (mine === null) {
    return { why: "it moved under this change, which would take it away, so it is kept" }
  }
  if (theirs === null) {
    return { why: "it was taken away while this change was written, so there is nothing to merge" }
  }
  if (base === null) {
    return { why: "it was made by another change as well, so there is no body to merge from" }
  }
  for (const one of [base, mine, theirs]) {
    if (!isText(one)) return { why: "it is not text, so it cannot be merged line by line" }
  }
  return mergedByGit(base, mine, theirs)
}
