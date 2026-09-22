import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { stampIn } from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import {
  bundleCommitIn,
  bundleNamedBy,
  codeMoving,
  commitAt,
  commitOver,
  movingUnder,
  saidOfMoved,
  saidOfNoCommit,
  saidOfNoStamp,
  stampOver,
  unitBeside,
} from "akasha/infrastructure/service/workstation/modules/code-moving/code-moving.module.code.ts"

const ONE_COMMIT = "1111111111111111111111111111111111111111"

const TWO_COMMIT = "2222222222222222222222222222222222222222"

const STILL = { moving: "still" } as const

const SCRATCH = mkdtempSync("/var/tmp/code-moving-")

afterAll(() => rmSync(SCRATCH, { recursive: true, force: true }))

function laidDown(at: string, text: string): string {
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, text)
  return at
}

function folder(...parts: readonly string[]): string {
  const at = join(SCRATCH, ...parts)
  mkdirSync(at, { recursive: true })
  return at
}

function treeOf(name: string, commit: string | null): string {
  const at = folder(name)
  if (commit !== null) laidDown(stampIn(at), `${commit}\n`)
  return at
}

test("a run at the root of a tree reads the commit the stamp there holds", () => {
  const at = treeOf("at-the-root", ONE_COMMIT)
  expect(stampOver(at)).toBe(stampIn(at))
  expect(commitOver(at)).toBe(ONE_COMMIT)
  expect(movingUnder(at, ONE_COMMIT)).toEqual(STILL)
})

test("a run folders deep under that root reads the stamp sitting at the root", () => {
  const at = treeOf("folders-deep", ONE_COMMIT)
  const deep = folder("folders-deep", "infrastructure", "service", "workstation", "modules")
  expect(stampOver(deep)).toBe(stampIn(at))
  expect(commitOver(deep)).toBe(ONE_COMMIT)
  expect(movingUnder(deep, ONE_COMMIT)).toEqual(STILL)
})

test("a run under two roots reads the stamp at the nearer one", () => {
  const at = treeOf("two-roots", ONE_COMMIT)
  const inner = folder("two-roots", "one", "inner")
  laidDown(stampIn(inner), `${TWO_COMMIT}\n`)
  expect(commitOver(folder("two-roots", "one", "inner", "deep"))).toBe(TWO_COMMIT)
  expect(commitOver(at)).toBe(ONE_COMMIT)
})

test("a run under no tree cannot tell, which is not the answer that nothing moved", () => {
  const at = folder("under-no-tree", "deep")
  expect(stampOver(at)).toBe(null)
  expect(commitOver(at)).toBe(null)
  const told = movingUnder(at, ONE_COMMIT)
  expect(told).toEqual({ moving: "unknown", why: saidOfNoStamp(at) })
  expect(told).not.toEqual(STILL)
  expect(told.moving).not.toBe("still")
  expect(told.moving).not.toBe("moved")
})

test("a stamp missing, empty or unreadable leaves a run unable to tell", () => {
  const gone = treeOf("stamp-gone", null)
  const blank = treeOf("stamp-blank", null)
  laidDown(stampIn(blank), "  \n")
  const shut = treeOf("stamp-shut", null)
  mkdirSync(stampIn(shut))
  expect(movingUnder(gone, ONE_COMMIT)).toEqual({ moving: "unknown", why: saidOfNoStamp(gone) })
  expect(movingUnder(blank, ONE_COMMIT)).toEqual({
    moving: "unknown",
    why: saidOfNoCommit(stampIn(blank)),
  })
  expect(movingUnder(shut, ONE_COMMIT)).toEqual({
    moving: "unknown",
    why: saidOfNoCommit(stampIn(shut)),
  })
  for (const at of [gone, blank, shut]) {
    expect(movingUnder(at, ONE_COMMIT)).not.toEqual(STILL)
  }
})

test("a commit no file gives back is no commit", () => {
  expect(commitAt(join(SCRATCH, "not-there"))).toBe(null)
  expect(commitAt(laidDown(join(SCRATCH, "blank"), "  \n"))).toBe(null)
})

test("a stamp holding another commit than the one a run started at has moved", () => {
  const at = treeOf("has-moved", TWO_COMMIT)
  const deep = folder("has-moved", "one", "two")
  expect(stampOver(deep)).toBe(stampIn(at))
  expect(movingUnder(deep, ONE_COMMIT)).toEqual({
    moving: "moved",
    moved: { from: ONE_COMMIT, to: TWO_COMMIT },
  })
  expect(movingUnder(deep, TWO_COMMIT)).toEqual(STILL)
})

test("a run that started at no commit cannot tell, however the stamp reads now", () => {
  const at = treeOf("started-nowhere", TWO_COMMIT)
  expect(movingUnder(at, null)).toEqual({ moving: "unknown", why: saidOfNoCommit(stampIn(at)) })
})

test("what is said of a move names both commits and the exit it leaves on", () => {
  const said = saidOfMoved({ from: ONE_COMMIT, to: TWO_COMMIT })
  expect(said).toContain(ONE_COMMIT)
  expect(said).toContain(TWO_COMMIT)
  expect(said).toContain("79")
})

test("what a run unable to tell says names where it looked and that it cannot tell", () => {
  const at = join(SCRATCH, "said-of")
  expect(saidOfNoStamp(at)).toContain(at)
  expect(saidOfNoStamp(at)).toContain("cannot tell")
  expect(saidOfNoCommit(stampIn(at))).toContain(stampIn(at))
  expect(saidOfNoCommit(stampIn(at))).toContain("cannot tell")
})

test("this test came out of no tree, so it is never told to leave", () => {
  expect(codeMoving().moving).not.toBe("moved")
})

function bundledOf(name: string, commit: string | null): string {
  const at = folder(name)
  if (commit !== null) {
    const bundle = join(at, `${commit}.js`)
    laidDown(bundle, "")
    laidDown(unitBeside(at), `[Service]\nExecStart=/usr/bin/env bash -c 'exec bun ${bundle}'\n`)
  }
  return at
}

test("a run loaded from a bundle came out of the commit that bundle is named for", () => {
  expect(bundleCommitIn(join(SCRATCH, "named", `${ONE_COMMIT}.js`))).toBe(ONE_COMMIT)
  expect(bundleCommitIn(join(SCRATCH, "named", "running.js"))).toBe(null)
})

test("a bundled run reads the commit the unit beside its folder names", () => {
  const at = bundledOf("bundle-still", ONE_COMMIT)
  expect(bundleNamedBy(at)).toBe(ONE_COMMIT)
  expect(movingUnder(at, ONE_COMMIT)).toEqual(STILL)
})

test("a unit naming another bundle than the one a run loaded has moved", () => {
  const at = bundledOf("bundle-moved", TWO_COMMIT)
  expect(movingUnder(at, ONE_COMMIT)).toEqual({
    moving: "moved",
    moved: { from: ONE_COMMIT, to: TWO_COMMIT },
  })
})

test("a bundle folder with no unit beside it leaves a run unable to tell", () => {
  const at = bundledOf("bundle-unheld", null)
  expect(bundleNamedBy(at)).toBe(null)
  expect(movingUnder(at, ONE_COMMIT)).toEqual({ moving: "unknown", why: saidOfNoStamp(at) })
})

test("a stamp at or above a folder is read rather than the unit beside it", () => {
  const at = bundledOf("bundle-under-a-tree", TWO_COMMIT)
  laidDown(stampIn(at), `${ONE_COMMIT}\n`)
  expect(movingUnder(at, ONE_COMMIT)).toEqual(STILL)
})
