import { describe, expect, test } from "bun:test"
import type { ImportSiteSample } from "./functional-type-import-scan.ts"
import {
  isWorkspaceDepCoveredByAllowlist,
  PURITY_TYPE_ONLY_ALLOWLIST,
  type PurityTypeOnlyAllowlistEntry,
} from "./functional-type-purity-allowlist.ts"

function sample(
  partial: Partial<ImportSiteSample> & Pick<ImportSiteSample, "names" | "allTypeOnly">
): ImportSiteSample {
  return {
    filePath: "/tmp/x.ts",
    hasDefaultOrNamespace: false,
    ...partial,
  }
}

const FIXTURE_ALLOWLIST: readonly PurityTypeOnlyAllowlistEntry[] = [
  {
    importer: "@fixture/importer",
    specifier: "@fixture/dep",
    names: ["PageWhere", "Page", "PageCondition"],
  },
]

describe("PURITY_TYPE_ONLY_ALLOWLIST", () => {
  test("all entries have non-empty names list", () => {
    for (const e of PURITY_TYPE_ONLY_ALLOWLIST) {
      expect(e.names.length).toBeGreaterThan(0)
    }
  })

  test("no duplicate (importer, specifier) pairs", () => {
    const seen = new Set<string>()
    for (const e of PURITY_TYPE_ONLY_ALLOWLIST) {
      const key = `${e.importer} ${e.specifier}`
      expect(seen.has(key)).toBe(false)
      seen.add(key)
    }
  })
})

describe("isWorkspaceDepCoveredByAllowlist", () => {
  test("no entry for (importer, dep) → false", () => {
    const imports: readonly ImportSiteSample[] = [sample({ names: ["X"], allTypeOnly: true })]
    expect(
      isWorkspaceDepCoveredByAllowlist("@unknown/pkg", "@scope/dep", imports, FIXTURE_ALLOWLIST)
    ).toBe(false)
  })

  test("empty imports (dep declared but unused) → false", () => {
    expect(
      isWorkspaceDepCoveredByAllowlist("@fixture/importer", "@fixture/dep", [], FIXTURE_ALLOWLIST)
    ).toBe(false)
  })

  test("entry exists, single type-only import of allowlisted name → true", () => {
    const imports: readonly ImportSiteSample[] = [
      sample({ names: ["PageWhere"], allTypeOnly: true }),
    ]
    expect(
      isWorkspaceDepCoveredByAllowlist(
        "@fixture/importer",
        "@fixture/dep",
        imports,
        FIXTURE_ALLOWLIST
      )
    ).toBe(true)
  })

  test("entry exists, type-only import of unlisted name → false", () => {
    const imports: readonly ImportSiteSample[] = [
      sample({ names: ["NotInRegistry"], allTypeOnly: true }),
    ]
    expect(
      isWorkspaceDepCoveredByAllowlist(
        "@fixture/importer",
        "@fixture/dep",
        imports,
        FIXTURE_ALLOWLIST
      )
    ).toBe(false)
  })

  test("entry exists, value import of allowlisted name → false", () => {
    const imports: readonly ImportSiteSample[] = [
      sample({ names: ["PageWhere"], allTypeOnly: false }),
    ]
    expect(
      isWorkspaceDepCoveredByAllowlist(
        "@fixture/importer",
        "@fixture/dep",
        imports,
        FIXTURE_ALLOWLIST
      )
    ).toBe(false)
  })

  test("entry exists, two type-only imports both allowlisted → true", () => {
    const imports: readonly ImportSiteSample[] = [
      sample({ names: ["PageWhere"], allTypeOnly: true }),
      sample({ names: ["Page", "PageCondition"], allTypeOnly: true }),
    ]
    expect(
      isWorkspaceDepCoveredByAllowlist(
        "@fixture/importer",
        "@fixture/dep",
        imports,
        FIXTURE_ALLOWLIST
      )
    ).toBe(true)
  })

  test("entry exists, one type-only allowlisted + one value-form anywhere → false", () => {
    const imports: readonly ImportSiteSample[] = [
      sample({ names: ["PageWhere"], allTypeOnly: true }),
      sample({ names: ["Page"], allTypeOnly: false }),
    ]
    expect(
      isWorkspaceDepCoveredByAllowlist(
        "@fixture/importer",
        "@fixture/dep",
        imports,
        FIXTURE_ALLOWLIST
      )
    ).toBe(false)
  })

  test("entry exists, default import of dep → false (hasDefaultOrNamespace)", () => {
    const imports: readonly ImportSiteSample[] = [
      sample({ names: [], allTypeOnly: false, hasDefaultOrNamespace: true }),
    ]
    expect(
      isWorkspaceDepCoveredByAllowlist(
        "@fixture/importer",
        "@fixture/dep",
        imports,
        FIXTURE_ALLOWLIST
      )
    ).toBe(false)
  })

  test("entry exists, namespace re-export `export * from` → false", () => {
    const imports: readonly ImportSiteSample[] = [
      sample({ names: [], allTypeOnly: false, hasDefaultOrNamespace: true }),
    ]
    expect(
      isWorkspaceDepCoveredByAllowlist(
        "@fixture/importer",
        "@fixture/dep",
        imports,
        FIXTURE_ALLOWLIST
      )
    ).toBe(false)
  })

  test("wrong importer with same dep & same allowlisted names → false", () => {
    const imports: readonly ImportSiteSample[] = [
      sample({ names: ["PageWhere"], allTypeOnly: true }),
    ]
    expect(
      isWorkspaceDepCoveredByAllowlist("@other/pkg", "@fixture/dep", imports, FIXTURE_ALLOWLIST)
    ).toBe(false)
  })

  test("wrong specifier with same names → false", () => {
    const imports: readonly ImportSiteSample[] = [
      sample({ names: ["PageWhere"], allTypeOnly: true }),
    ]
    expect(
      isWorkspaceDepCoveredByAllowlist(
        "@fixture/importer",
        "@other/dep",
        imports,
        FIXTURE_ALLOWLIST
      )
    ).toBe(false)
  })

  test("mixed types in one statement — allTypeOnly false even when all names allowlisted", () => {
    const imports: readonly ImportSiteSample[] = [
      sample({ names: ["Page", "PageWhere"], allTypeOnly: false }),
    ]
    expect(
      isWorkspaceDepCoveredByAllowlist(
        "@fixture/importer",
        "@fixture/dep",
        imports,
        FIXTURE_ALLOWLIST
      )
    ).toBe(false)
  })
})
