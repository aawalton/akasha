import { describe, expect, test } from "bun:test"
import { shouldScanFile } from "./check-client-page-access-boundary.ts"

const USE_CLIENT_SRC = '"use client"\n\nexport const widget = 1\n'

describe("shouldScanFile — path scope (packages/**, ts/tsx, no excluded dirs)", () => {
  test("a use-client .ts file in a SHARED package (outside any app/ dir) is scanned", () => {
    expect(shouldScanFile("packages/shared/widgets/src/use-widgets.ts", USE_CLIENT_SRC)).toBe(true)
  })

  test("a use-client .tsx file in a shared package is scanned", () => {
    expect(shouldScanFile("packages/shared/widgets/src/widget-card.tsx", USE_CLIENT_SRC)).toBe(true)
  })

  test("a React Router app's app/ file remains in scope (widening is a superset)", () => {
    expect(shouldScanFile("packages/temper/web/app/components/x.tsx", USE_CLIENT_SRC)).toBe(true)
  })

  test("a file under node_modules is excluded even with a use-client directive", () => {
    expect(
      shouldScanFile("packages/shared/widgets/node_modules/lib/use-thing.ts", USE_CLIENT_SRC)
    ).toBe(false)
  })

  test("a file under dist is excluded", () => {
    expect(shouldScanFile("packages/shared/widgets/dist/use-widgets.ts", USE_CLIENT_SRC)).toBe(
      false
    )
  })

  test("a file under a generated dir is excluded", () => {
    expect(
      shouldScanFile("packages/shared/widgets/src/generated/use-widgets.ts", USE_CLIENT_SRC)
    ).toBe(false)
  })

  test("a file under __fixtures__ is excluded (CHECK_EXEMPT_DIRS convention)", () => {
    expect(
      shouldScanFile(
        "packages/infra/checks/__fixtures__/client-page-access-boundary/shared-leak/packages/shared/x/use-x.ts",
        USE_CLIENT_SRC
      )
    ).toBe(false)
  })

  test("the pages-ui boundary package itself is excluded (rule-domain: a boundary cannot route through itself)", () => {
    expect(shouldScanFile("packages/shared/pages/ui/src/supabase/hooks.ts", USE_CLIENT_SRC)).toBe(
      false
    )
  })

  test("the pages-ui-store boundary package itself is excluded (PGlite substrate, not Supabase)", () => {
    expect(
      shouldScanFile("packages/shared/pages/ui-store/src/control/client.ts", USE_CLIENT_SRC)
    ).toBe(false)
  })

  test("a sibling pages sub-package (not a boundary package) stays in scope", () => {
    expect(shouldScanFile("packages/shared/pages/url/src/use-page-href.ts", USE_CLIENT_SRC)).toBe(
      true
    )
  })

  test("a file outside packages/ is excluded", () => {
    expect(shouldScanFile("scripts/use-tooling.ts", USE_CLIENT_SRC)).toBe(false)
  })

  test("a non-ts/tsx file is excluded", () => {
    expect(shouldScanFile("packages/shared/widgets/docs/use-widgets.md", USE_CLIENT_SRC)).toBe(
      false
    )
  })
})

describe("shouldScanFile — use-client text prefilter", () => {
  test("a source with no directive is filtered out", () => {
    expect(
      shouldScanFile("packages/shared/widgets/src/server-sync.ts", "export const widget = 1\n")
    ).toBe(false)
  })

  test("a single-quoted 'use client' directive passes", () => {
    expect(
      shouldScanFile(
        "packages/shared/widgets/src/use-widgets.ts",
        "'use client'\nexport const x = 1\n"
      )
    ).toBe(true)
  })

  test("a directive preceded by 'use strict' in the prologue still passes", () => {
    expect(
      shouldScanFile(
        "packages/shared/widgets/src/use-widgets.ts",
        '"use strict"\n"use client"\nexport const x = 1\n'
      )
    ).toBe(true)
  })

  test("a leading comment before the directive does not defeat the prefilter (must not underapproximate isUseClientModule)", () => {
    expect(
      shouldScanFile(
        "packages/shared/widgets/src/use-widgets.ts",
        '// widget client hooks\n"use client"\nexport const x = 1\n'
      )
    ).toBe(true)
  })

  test("'use client' appearing mid-file (after real code, not a leading directive) is filtered out", () => {
    expect(
      shouldScanFile(
        "packages/shared/widgets/src/server-sync.ts",
        'const a = 1\n"use client"\nexport const x = a\n'
      )
    ).toBe(false)
  })
})
