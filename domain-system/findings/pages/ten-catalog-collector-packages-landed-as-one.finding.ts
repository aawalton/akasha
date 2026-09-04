import type { Finding } from "../finding.page-type.ts"

export const tenCatalogCollectorPackagesLandedAsOne = {
  id: "01a060ec-47c2-7c9d-b02b-696e2d213345",
  pageTypeSlug: "finding",
  slug: "ten-catalog-collector-packages-landed-as-one",
  domainSlug: "workspace-package/temper-game-catalog-capture-addon",
  claim:
    "The ten `@temper/game-*-capture-addon` catalog packages held fifteen collectors between them and nothing else. They landed as one workspace package holding fifteen modules rather than as ten siblings. Not one carried an `addon.json`, so not one was an addon; each was a library the TemperCatalog addon bundles. What goes is the ten-package boundary, which cost a manifest and a typecheck config for every one or two collector files. No capability goes.",
  evidence:
    "Six of the ten held a single source file, two held two, and two held three. Every one of the ten declared the same two dependencies and nothing else, `@akasha/temper-capture-shapes` and `@akasha/temper-catalog-core`, with `@akasha/temper-capture-writer`, `@akasha/temper-narrow` and `@akasha/utils-narrow` added by the three that batch their reads. Every collector ends by calling `registerCatalogDomain` from `temper-catalog-core`, so the ten packages were one registry seen ten ways. Two things already landed the same way: the twelve type-only `game-*-capture-core` packages became `temper-capture-shapes`, and the ten host-side readers became `temper-game-catalog-capture-host` under one manifest with ten schema modules. The new package answers that host reader for reader. Each module's subpath way in is named for the catalog rather than for the old file, so `@temper/game-navigation-capture-addon/points-of-interest` becomes `@akasha/temper-game-catalog-capture-addon/poi-catalog-capture`, matching `poi-catalog-schema` on the host. All fifteen code bodies are byte-identical to their sources once the import block is set aside, checked by stripping every import line from both sides and comparing: fifteen equal, none differing. The character and item collectors, four more in `game-characters-capture-addon` and `game-items-capture-addon`, were outside this wave and belong in the same package; the package page carries a gap invariant for each.",
} as const satisfies Finding
