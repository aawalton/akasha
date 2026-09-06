import type { Module } from "@akasha/code-system/module"

export const rebuilding = {
  id: "01a0584f-30ed-7000-bd17-95f4f41ac634",
  pageTypeSlug: "module",
  slug: "rebuilding",
  definition: "the index reconciled against what the pages say, file by file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The index is repaired in place rather than built beside it and swapped in.",
    },
    {
      invariantKind: "departure",
      statement: "A file the build writes is put in place by renaming rather than by copying.",
    },
    {
      invariantKind: "departure",
      statement: "A file already holding the lines the pages imply is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A file the pages no longer imply is found by walking the index, and taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A folder left empty by that goes with the file.",
    },
    {
      invariantKind: "departure",
      statement: "A build putting nothing in place is answered for as fully as one that does.",
    },
    {
      invariantKind: "departure",
      statement: "Where the index stands is derived from the repository root given here.",
    },
    {
      invariantKind: "departure",
      statement: "A file at the index's own top belongs to no index and is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A folder beside the index whose name opens `index.` is taken away with it.",
    },
    {
      invariantKind: "departure",
      statement: "That sweep answers only for a folder named `index`.",
    },
    {
      invariantKind: "departure",
      statement: "An index that is not there yet sweeps nothing rather than refusing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides whether a rebuild should run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says in words the change a rebuild made.",
    },
  ],
} as const satisfies Module
