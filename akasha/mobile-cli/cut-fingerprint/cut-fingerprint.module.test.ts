import { describe, expect, test } from "bun:test"
import { idDerivedFrom } from "@akasha/file-page-identity"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import { textOf } from "@akasha/pages-system/page-query-values"
import { readFilePages } from "@tools/lib/file-pages"
import { landingTextFor } from "@tools/lib/page-write-compose"
import { statedIn, textIn } from "@tools/lib/page-write-text"
import { whereFor } from "@tools/lib/page-write-where"
import {
  type CutFingerprint,
  compareCutStatus,
  cutFingerprintValues,
  cutPageNameFor,
  cutPageValuesFor,
  fingerprintOf,
  MOBILE_CUT_PAGE_TYPE_SLUG,
  readLatestCutFingerprint,
} from "./cut-fingerprint.module.code.ts"

const BASIS: CutFingerprint = {
  buildNumber: 198,
  mainSha: "04959e93f4ae2315ffd3408f64ca39be17fd7781",
  shellSha: "04959e93f4ae2315ffd3408f64ca39be17fd7781",
  buildInputTreeHash: "5fb92d3b10db3b475c76783954598fd72a03bc49e7020135ff9ab4b077822609",
  cutAt: "2026-09-01T14:37:31.265Z",
}

function composedFor(appSlug: string, fp: CutFingerprint): string {
  const landing = landingTextFor(
    resolveRoots(),
    MOBILE_CUT_PAGE_TYPE_SLUG,
    cutPageNameFor(appSlug, fp.buildNumber),
    cutPageValuesFor(appSlug, fp),
    "write"
  )
  if (landing === null) throw new Error(`nowhere places a \`${MOBILE_CUT_PAGE_TYPE_SLUG}\` page`)
  return landing.text
}

function readBack(text: string): CutFingerprint {
  return fingerprintOf(cutFingerprintValues.parse(statedIn(text)))
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
  test("a filed fingerprint reads back identically", () => {
    expect(readBack(composedFor("alanwalton", BASIS))).toEqual(BASIS)
  })

  test("what build 198 files is byte for byte the page already filed for build 198", () => {
    const at = whereFor(resolveRoots(), MOBILE_CUT_PAGE_TYPE_SLUG, "alanwalton-198")
    expect(at).not.toBe(null)
    if (at === null) return
    expect(composedFor("alanwalton", BASIS)).toBe(textIn(at.path))
  })

  test("a fingerprint carrying no shell sha and no tree hash leaves both keys off", () => {
    const spare: CutFingerprint = {
      ...BASIS,
      buildNumber: 424242,
      shellSha: null,
      buildInputTreeHash: null,
    }
    const text = composedFor("alanwalton", spare)
    expect(text).not.toContain("shell-sha")
    expect(text).not.toContain("build-input-tree-hash")
    expect(readBack(text)).toEqual(spare)
  })

  test("a page filed where none was there carries the id its own address yields", () => {
    const fresh: CutFingerprint = { ...BASIS, buildNumber: 424242 }
    const stated = statedIn(composedFor("alanwalton", fresh))
    expect(stated["id"]).toBe(
      idDerivedFrom(`akasha:pages/${MOBILE_CUT_PAGE_TYPE_SLUG}/alanwalton-424242.mobile-cut.md`)
    )
    expect(String(stated["id"])[14]).toBe("5")
  })
})
