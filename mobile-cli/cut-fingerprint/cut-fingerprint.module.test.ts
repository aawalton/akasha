import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { loadedFrom } from "@akasha/pages-system/page-value"
import {
  CUTS_FOLDER,
  type CutFingerprint,
  compareCutStatus,
  cutFingerprintValues,
  cutPageBody,
  cutPageNameFor,
  cutPagePath,
  fingerprintOf,
  MOBILE_CUT_PAGE_TYPE_SLUG,
  readCutPages,
  readLatestCutFingerprint,
} from "./cut-fingerprint.module.code.ts"

const BASIS: CutFingerprint = {
  buildNumber: 198,
  mainSha: "04959e93f4ae2315ffd3408f64ca39be17fd7781",
  shellSha: "04959e93f4ae2315ffd3408f64ca39be17fd7781",
  buildInputTreeHash: "5fb92d3b10db3b475c76783954598fd72a03bc49e7020135ff9ab4b077822609",
  cutAt: "2026-09-01T14:37:31.265Z",
}

function readBack(text: string): CutFingerprint {
  const value = loadedFrom(text).value
  if (value === null) throw new Error("the composed body declares no page value")
  return fingerprintOf(cutFingerprintValues.parse(value))
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

describe("readCutPages", () => {
  test("the cuts are the TypeScript pages inside akasha rather than markdown", () => {
    const pages = readCutPages()
    expect(pages.length).toBeGreaterThan(0)
    for (const page of pages) {
      expect(page.path.startsWith(`${CUTS_FOLDER}/`)).toBe(true)
      expect(page.path.endsWith(`.${MOBILE_CUT_PAGE_TYPE_SLUG}.ts`)).toBe(true)
    }
  })

  test("every cut standing carries a fingerprint that reads", () => {
    for (const page of readCutPages()) {
      expect(cutFingerprintValues.safeParse(page.value).success).toBe(true)
    }
  })

  test("a page stands where its slug says it stands", () => {
    for (const page of readCutPages()) expect(page.path).toBe(cutPagePath(page.slug))
  })
})

describe("readLatestCutFingerprint", () => {
  test("the last cut is the page carrying the highest build number", async () => {
    const filed = readCutPages().filter((page) => page.value["appSlug"] === "alanwalton")
    expect(filed.length).toBeGreaterThan(1)
    const highest = Math.max(...filed.map((page) => Number(page.value["buildNumber"])))

    const last = await readLatestCutFingerprint("alanwalton")
    expect(last).not.toBe(null)
    expect(last?.buildNumber).toBe(highest)
  })

  test("an app no page names reads as no cut rather than raising", async () => {
    expect(await readLatestCutFingerprint("no-app-is-named-this")).toBe(null)
  })
})

describe("cutPageBody", () => {
  test("a filed fingerprint reads back identically", () => {
    expect(readBack(cutPageBody("alanwalton", BASIS))).toEqual(BASIS)
  })

  test("what a build files is the page already filed for that build, but for its minted id", () => {
    const root = rootFor(resolveRoots(), AKASHA)
    const slug = cutPageNameFor("alanwalton", 202)
    const standing = readFileSync(join(root, cutPagePath(slug)), "utf8")
    const filed = readBack(standing)
    const minted = /^ {2}id: ".*",$/m
    expect(standing).toMatch(minted)
    expect(cutPageBody("alanwalton", filed).replace(minted, "")).toBe(standing.replace(minted, ""))
  })

  test("a fingerprint carrying no shell sha and no tree hash leaves both keys off", () => {
    const spare: CutFingerprint = {
      ...BASIS,
      buildNumber: 424242,
      shellSha: null,
      buildInputTreeHash: null,
    }
    const text = cutPageBody("alanwalton", spare)
    expect(text).not.toContain("shellSha")
    expect(text).not.toContain("buildInputTreeHash")
    expect(readBack(text)).toEqual(spare)
  })

  test("a filed cut mints its own id rather than deriving one from a markdown address", () => {
    const text = cutPageBody("alanwalton", { ...BASIS, buildNumber: 424242 })
    const value = loadedFrom(text).value
    expect(typeof value?.["id"]).toBe("string")
    expect(String(value?.["id"])[14]).toBe("7")
  })
})
