import { describe, expect, test } from "bun:test"
import { readFilePages } from "@tools/lib/file-pages"
import { textOf } from "@tools/lib/page-query-values"
import {
  type CutFingerprint,
  compareCutStatus,
  MOBILE_CUT_PAGE_TYPE_SLUG,
  readLatestCutFingerprint,
  recordCutFingerprint,
} from "./cut-fingerprint.module.code.ts"

const BASIS: CutFingerprint = {
  buildNumber: 198,
  mainSha: "04959e93f4ae2315ffd3408f64ca39be17fd7781",
  shellSha: "04959e93f4ae2315ffd3408f64ca39be17fd7781",
  buildInputTreeHash: "5fb92d3b10db3b475c76783954598fd72a03bc49e7020135ff9ab4b077822609",
  cutAt: "2026-09-01T14:37:31.265Z",
}

describe("compareCutStatus", () => {
  test("no fingerprint at all owes a cut, because devices carry nothing comparable", () => {
    const status = compareCutStatus(null, { mainSha: "abc", buildInputTreeHash: "hash" })
    expect(status.owed).toBe(true)
    expect(status.predatesBasis).toBe(false)
    expect(status.lastCut).toBe(null)
  })

  test("a fingerprint with no build input tree hash predates the basis and owes a cut", () => {
    const status = compareCutStatus(
      { ...BASIS, buildInputTreeHash: null },
      { mainSha: "abc", buildInputTreeHash: "hash" }
    )
    expect(status.owed).toBe(true)
    expect(status.predatesBasis).toBe(true)
  })

  test("an unchanged build input tree hash owes nothing, even where main moved", () => {
    const status = compareCutStatus(BASIS, {
      mainSha: "a-later-commit",
      buildInputTreeHash: BASIS.buildInputTreeHash ?? "",
    })
    expect(status.owed).toBe(false)
    expect(status.buildInputChanged).toBe(false)
    expect(status.lastCut).toEqual(BASIS)
  })

  test("a changed build input tree hash owes a cut", () => {
    const status = compareCutStatus(BASIS, { mainSha: BASIS.mainSha, buildInputTreeHash: "other" })
    expect(status.owed).toBe(true)
    expect(status.buildInputChanged).toBe(true)
  })
})

describe("readLatestCutFingerprint", () => {
  test("the last cut is the page carrying the highest build number", async () => {
    const rows = readFilePages(MOBILE_CUT_PAGE_TYPE_SLUG, ["app-slug", "build-number"]).filter(
      (row) => textOf(row.values, "app-slug") === "alanwalton"
    )
    expect(rows.length).toBeGreaterThan(1)
    const highest = Math.max(...rows.map((row) => Number(textOf(row.values, "build-number"))))

    const last = await readLatestCutFingerprint("alanwalton")
    expect(last).not.toBe(null)
    expect(last?.buildNumber).toBe(highest)
  })

  test("an app no page names reads as no cut rather than raising", async () => {
    expect(await readLatestCutFingerprint("no-app-is-named-this")).toBe(null)
  })
})

describe("recordCutFingerprint", () => {
  test("filing a cut raises, and says the reading half will not move", async () => {
    await expect(recordCutFingerprint("alanwalton", BASIS)).rejects.toThrow(/was not written/)
  })
})
