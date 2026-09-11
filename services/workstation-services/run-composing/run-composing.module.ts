import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const runComposing = {
  id: "01a08dff-2d3f-7efd-945c-c66c06e004db",
  pageTypeSlug: "module",
  type: "module",
  slug: "run-composing",
  definition: "the command line a workstation service's start states as pages rather than paths",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command names the page to run rather than spelling that page's path.",
    },
    {
      invariantKind: "departure",
      statement: "The file run is the one code file that page's type requires.",
    },
    {
      invariantKind: "departure",
      statement: "The form the page holds that file in settles the program running the file.",
    },
    {
      invariantKind: "departure",
      statement: "A page type requiring no code file or more than one refuses by name.",
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
      statement: "A file held as TypeScript is run by bun and one held as shell by bash.",
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
      invariantKind: "departure",
      statement: "A page stating a start is composed from that start rather than from a fixture.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a unit.",
    },
  ],
} as const satisfies Module
