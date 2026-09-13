import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const serviceRunning = {
  id: "01a09573-1d3f-7d99-82f9-932723a87bdd",
  type: "module",
  slug: "service-running",
  definition: "a workstation service reached by its slug and run from the code beside its page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service is named by its slug rather than by the file holding its code.",
    },
    {
      invariantKind: "departure",
      statement: "The code a service runs is the `running` group beside that service's page.",
    },
    {
      invariantKind: "departure",
      statement: "The test proving a service runs is the `running` group's test beside its page.",
    },
    {
      invariantKind: "departure",
      statement: "The page a slug names is read from the index.",
    },
    {
      invariantKind: "absence",
      statement: "A slug no page is filed under is answered for by no test.",
    },
    {
      invariantKind: "departure",
      statement: "The pages are read under the checkout the environment names.",
    },
    {
      invariantKind: "departure",
      statement: "The code is taken from the checkout this module itself sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A service whose running code exports no `runService` is refused rather than run.",
    },
    {
      invariantKind: "departure",
      statement: "A run refused before the service started ends on two.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing a unit spells past the slug is handed to the service's own run.",
    },
  ],
} as const satisfies Module
