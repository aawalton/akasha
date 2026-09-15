import type { Module } from "akasha/code/module/module.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement: "A command names the page to run rather than spelling that page's path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file run is the one code file that page's type requires.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The form the page holds that file in settles the program running the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type requiring no code file or more than one refuses by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page named as an argument is handed over as that page's own path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page argument comes before every literal argument.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file held as TypeScript is run by bun and one held as shell by bash.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A name reaching no page refuses rather than composing a path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The path a page sits at is read from the index rather than from the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key a page holds that file under is read from the index rather than a page.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a unit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run is spelled under the tree named where a tree is named, and under the root where none is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree holding no such file refuses rather than naming a path that is not there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command and the code that command runs come from one commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page handed over as an argument keeps its own path, since a page is read under the root.",
    },
  ],
} as const satisfies Module
