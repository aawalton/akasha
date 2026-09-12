import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperCatalogCore = {
  id: "01a06071-0c7a-7792-ab3e-69213b5eaf92",
  type: "domain",
  slug: "temper-catalog-core",
  definition: "the shape a capture of the game's reference data takes, and the walk that fills it",
  parts: [
    "module/apply-invalidations",
    "module/batch-config",
    "module/catalog-descriptor",
    "module/catalog-payload",
    "module/catalog-walk",
    "module/clear-target",
    "module/domain-keys",
    "module/domain-registry",
    "module/saved-variables-accessor",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The catalog add-on and every reader of the add-on's capture agree here.",
    },
    {
      invariantKind: "departure",
      statement: "Each catalog domain's collector lives in a folder apart from this folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Domain
