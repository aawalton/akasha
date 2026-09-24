import { afterAll, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  bundleCommitIn,
  bundleNamedBy,
  codeMoving,
  movingUnder,
  saidOfMoved,
  saidOfNoBundle,
  unitBeside,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/code-moving/code-moving.module.code.ts"

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

test("a run under no unit cannot tell, which is not the answer that nothing moved", () => {
  const at = folder("under-no-unit", "deep")
  const told = movingUnder(at, ONE_COMMIT)
  expect(told).toEqual({ moving: "unknown", why: saidOfNoBundle(at) })
  expect(told).not.toEqual(STILL)
  expect(told.moving).not.toBe("still")
  expect(told.moving).not.toBe("moved")
})

test("what is said of a move names both commits and the exit it leaves on", () => {
  const said = saidOfMoved({ from: ONE_COMMIT, to: TWO_COMMIT })
  expect(said).toContain(ONE_COMMIT)
  expect(said).toContain(TWO_COMMIT)
  expect(said).toContain("79")
})

test("what a run unable to tell says names where it looked and that it cannot tell", () => {
  const at = join(SCRATCH, "said-of")
  expect(saidOfNoBundle(at)).toContain(at)
  expect(saidOfNoBundle(at)).toContain("cannot tell")
})

test("this test came out of no bundle, so it is never told to leave", () => {
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
  expect(movingUnder(at, ONE_COMMIT)).toEqual({ moving: "unknown", why: saidOfNoBundle(at) })
})
