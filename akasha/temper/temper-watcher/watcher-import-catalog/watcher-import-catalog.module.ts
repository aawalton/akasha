import type { Module } from "@akasha/code-system/module"

export const watcherImportCatalog = {
  id: "01a06381-35cf-7af7-aa60-01ed66da5e3b",
  pageTypeSlug: "module",
  slug: "watcher-import-catalog",
  definition:
    "a catalog capture's game build written onto every catalog domain page that capture holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The account-wide table is read by `@akasha/temper-catalog-host`.",
    },
    {
      invariantKind: "departure",
      statement: "The account a capture is read for is the first the saved variables name.",
    },
    {
      invariantKind: "departure",
      statement: "The domain keys are the list `@akasha/temper-catalog-core` declares.",
    },
    {
      invariantKind: "departure",
      statement: "A domain page is reached by the slug its saved-variables key kebab-cases into.",
    },
    {
      invariantKind: "constraint",
      statement: "A capture naming no apiVersion or manifestApiVersion changes no page.",
    },
    {
      invariantKind: "constraint",
      statement: "A capture holding no catalog domain changes no page.",
    },
    {
      invariantKind: "departure",
      statement: "A domain key no page carries is reported and the other domains still change.",
    },
    {
      invariantKind: "departure",
      statement: "Saved variables with no readable account-wide table raise an error.",
    },
    {
      invariantKind: "departure",
      statement: "Every page one run reaches is given the same capture instant.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in the clock.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what changes a page.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in what is reported to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens the saved-variables file.",
    },
    {
      invariantKind: "gap",
      statement: "A capture for a second account is read by nothing here.",
    },
  ],
} as const satisfies Module
