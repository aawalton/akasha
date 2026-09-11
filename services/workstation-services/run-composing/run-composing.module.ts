import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const runComposing = {
  id: "01a08dff-2d3f-7efd-945c-c66c06e004db",
  pageTypeSlug: "module",
  type: "module",
  slug: "run-composing",
  definition: "the command line a workstation service's run states as pages rather than paths",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run names the module to run rather than spelling that module's path.",
    },
    {
      invariantKind: "departure",
      statement: "The file a module is run from is the code file beside that module's page.",
    },
    {
      invariantKind: "departure",
      statement: "A page named as an argument is handed over as that page's own path.",
    },
    {
      invariantKind: "departure",
      statement: "Every page argument comes before every literal argument.",
    },
    {
      invariantKind: "departure",
      statement: "A word placed before the runner is spelled out rather than named.",
    },
    {
      invariantKind: "departure",
      statement: "A module's code is run by bun.",
    },
    {
      invariantKind: "departure",
      statement: "A run that may fail without the service failing opens with a dash.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching no page refuses rather than composing a path.",
    },
    {
      invariantKind: "departure",
      statement: "The path a page sits at is read from the index rather than from the page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a unit.",
    },
  ],
} as const satisfies Module
