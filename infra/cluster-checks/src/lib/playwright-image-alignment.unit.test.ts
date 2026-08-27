import { describe, expect, test } from "bun:test"

import {
  computeAlignmentViolations,
  extractLockPlaywrightCoreVersions,
  extractMcrPlaywrightVersions,
  type VersionReading,
} from "./playwright-image-alignment.ts"

describe("extractMcrPlaywrightVersions", () => {
  test("extracts from a dockerfile-extensions FROM stage", () => {
    const text = '"FROM mcr.microsoft.com/playwright:v1.61.1-noble AS playwright"'
    expect(extractMcrPlaywrightVersions(text)).toEqual(["1.61.1"])
  })

  test("extracts from a mirror-script MCR entry", () => {
    const text = 'MCR_IMAGES=(\n  "mcr.microsoft.com/playwright:v1.61.1-noble"\n)'
    expect(extractMcrPlaywrightVersions(text)).toEqual(["1.61.1"])
  })

  test("returns empty when no MCR playwright ref is present", () => {
    expect(extractMcrPlaywrightVersions("FROM oven/bun:1.3.14-debian")).toEqual([])
  })

  test("yields every entry when a mirror list names two Playwright images", () => {
    const text =
      'MCR_IMAGES=(\n  "mcr.microsoft.com/playwright:v1.61.1-noble"\n  "mcr.microsoft.com/playwright:v1.52.0-noble"\n)'
    expect(extractMcrPlaywrightVersions(text)).toEqual(["1.61.1", "1.52.0"])
  })
})

describe("extractLockPlaywrightCoreVersions", () => {
  test("extracts the resolved version from a bun.lock entry", () => {
    const lock =
      '    "playwright-core": ["playwright-core@1.61.1", "", { "bin": { "playwright-core": "cli.js" } }, "sha512-abc"],'
    expect(extractLockPlaywrightCoreVersions(lock)).toEqual(["1.61.1"])
  })

  test("returns empty when the lock has no playwright-core resolution", () => {
    expect(extractLockPlaywrightCoreVersions('"zod": ["zod@3.24.1", ...]')).toEqual([])
  })

  test("yields both resolutions when the lockfile resolves playwright-core twice", () => {
    const lock = [
      '    "playwright-core": ["playwright-core@1.61.1", "", {}, "sha512-abc"],',
      '    "other/playwright-core": ["playwright-core@1.52.0", "", {}, "sha512-def"],',
    ].join("\n")
    expect(extractLockPlaywrightCoreVersions(lock)).toEqual(["1.61.1", "1.52.0"])
  })

  test("is stable across repeated calls over the same text", () => {
    const lock = '"playwright-core@1.61.1"\n"playwright-core@1.52.0"'
    expect(extractLockPlaywrightCoreVersions(lock)).toEqual(["1.61.1", "1.52.0"])
    expect(extractLockPlaywrightCoreVersions(lock)).toEqual(["1.61.1", "1.52.0"])
  })
})

describe("computeAlignmentViolations", () => {
  const reading = (source: string, version: string | null): VersionReading => ({
    source,
    version,
  })

  test("uniform readings produce zero violations", () => {
    const readings = [
      reading("packages/a/package.json", "1.61.1"),
      reading("bun.lock", "1.61.1"),
      reading("deploy/playwright.dockerfile-extensions.json", "1.61.1"),
    ]
    expect(computeAlignmentViolations(readings)).toHaveLength(0)
  })

  test("a null reading is an extraction violation even when the rest agree", () => {
    const readings = [
      reading("bun.lock", "1.61.1"),
      reading("infra/scripts/mirror-base-images.sh", null),
    ]
    const out = computeAlignmentViolations(readings)
    expect(out).toHaveLength(1)
    expect(out[0]?.source).toBe("infra/scripts/mirror-base-images.sh")
  })

  test("divergent versions flag every reading", () => {
    const readings = [
      reading("packages/a/package.json", "^1.58.2"),
      reading("bun.lock", "1.61.1"),
      reading("deploy/playwright.dockerfile-extensions.json", "1.59.1"),
    ]
    const out = computeAlignmentViolations(readings)
    expect(out).toHaveLength(3)
    expect(new Set(out.map((v) => v.source)).size).toBe(3)
  })
})
