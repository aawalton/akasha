import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const runComposing = {
  id: "01a08dff-2d3f-7efd-945c-c66c06e004db",
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
      statement: "A file held as TypeScript is run by bun and one held as shell by bash.",
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
      statement: "The key a page holds that file under is read from the index rather than a page.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here writes a unit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run is spelled under the tree named where a tree is named, and under the root where none is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page handed over as an argument keeps its own path, since a page is read under the root.",
    },
  ],
} as const satisfies Module
