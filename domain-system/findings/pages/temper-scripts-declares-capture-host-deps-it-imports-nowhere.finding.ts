import type { Finding } from "../finding.page-type.ts"

export const temperScriptsDeclaresCaptureHostDepsItImportsNowhere = {
  id: "01a0607e-a956-7216-b059-c2570438e7fc",
  pageTypeSlug: "finding",
  slug: "temper-scripts-declares-capture-host-deps-it-imports-nowhere",
  domainSlug: "domain/temper",
  claim:
    "`temper/scripts/package.json` declared all six `game-*-capture-host` packages as dependencies while no file under `temper/scripts/src` imported any of them. The only importer was `tools/lib/temper-catalog-generate/tiers/`, which lives in a different workspace. The declarations were repointed at the akasha packages rather than deleted, because nothing here shows whether they are dead or merely unused today.",
  evidence:
    "A grep for each of the six specifiers across every tracked file returned, for each one, exactly two kinds of hit: the `temper/scripts/package.json` dependency line, and an import in `tools/lib/temper-catalog-generate/tiers/`.\n\nFor example `@temper/game-collections-antiquities-capture-host` appeared at `temper/scripts/package.json:25` and at `tools/lib/temper-catalog-generate/tiers/antiquity.ts:2`, and nowhere else.\n\nNo file under `temper/scripts/src` named any of the six. `temper/scripts` did import `@temper/shared-capture-host/assert-schema-matches-payload`, at `src/watcher/import-sales.ts:4`, so its dependency on the hub was real even though its dependencies on the six were not.\n\nThe six declarations now read `@akasha/temper-game-*-capture-host`. They resolve, so nothing is broken by keeping them, and a seat tearing down `temper/scripts` can drop them once it knows they are dead.\n\nThe teardown that preceded this one recorded the same shape: a manifest carrying two dependencies it imported nowhere.",
} as const satisfies Finding
