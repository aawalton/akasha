import type { Finding } from "../finding.page-type.ts"

export const theCatalogAddonImportOrderIsTheCollectionOrder = {
  id: "01a060ec-47c3-733d-9424-bfcda1f495ad",
  pageTypeSlug: "finding",
  slug: "the-catalog-addon-import-order-is-the-collection-order",
  domainSlug: "workspace-package/temper-catalog-core",
  claim:
    "The order of the nineteen side-effect imports in `temper/catalog-addon/src/main.ts` is the order every game catalog is collected in. A repoint that groups those imports by package, or any tool that sorts them, changes the collection order and nothing fails. The teardown of the ten collector packages rewrites fifteen of the nineteen, so this is a live hazard rather than a distant one.",
  evidence:
    '`registerCatalogDomain` appends with `REGISTRY[REGISTRY.length] = entry` and `getCatalogDomains` answers the array as it is, at `akasha/temper/temper-catalog-core/domain-registry/domain-registry.module.code.ts`. The page beside it states the invariant outright: "Collectors are run in the order the collectors were added." A collector is added by the side effect of importing it, so the import order in the bundle entry is the registry order. `autoCollect` in `temper/catalog-addon/src/main.ts` gathers the pending domains by reading `getCatalogDomains()` in order and hands the list to `runCatalogWalk`, which runs each in turn under a per-domain delay and timeout. The nineteen imports are not in package order today and are not sorted: `game-completion` appears at lines 14, 18 and 24 with other packages between. Biome leaves side-effect imports where they are rather than sorting them, so `organizeImports` is not the risk. The risk is a hand-written repoint that gathers the fifteen `@akasha/` lines above the four `@temper/` lines that remain. The validated repoint at `scratchpad/capture-seat/sandbox/main.after.ts` rewrites each line in place and asserted `order preserved: True` against the nineteen read back out.',
} as const satisfies Finding
