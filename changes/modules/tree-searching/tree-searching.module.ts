import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const treeSearching = {
  id: "01a0a06a-7815-7496-bab7-bcf7151d8cce",
  type: "module",
  slug: "tree-searching",
  definition:
    "the paths a search or a listing of the tree names, with the answer a change carries laid over",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every spelling asked after is searched for in one run.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling is matched as written letters rather than as a pattern.",
    },
    {
      invariantKind: "departure",
      statement: "The file kinds searched are the ones the caller names.",
    },
    {
      invariantKind: "departure",
      statement: "The git folder and the packages folder and the index folder are left unsearched.",
    },
    {
      invariantKind: "departure",
      statement: "A path the search names is answered against the root that search was handed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller handing a root rather than a world is answered every path the search names.",
    },
    {
      invariantKind: "departure",
      statement: "A file the repository ignores is left unsearched where the caller names no kind.",
    },
    {
      invariantKind: "departure",
      statement: "A file a named kind matches is searched though the repository ignores that file.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the repository ignores is left unsearched whatever kinds are named.",
    },
    {
      invariantKind: "departure",
      statement: "A body no commit holds yet is searched though the repository ignores it.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer so far writes is answered beside the paths the search names.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer so far writes is answered though no body sits on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer so far takes away is left out though the search names it.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer so far moves is answered at the path moved to.",
    },
    {
      invariantKind: "departure",
      statement: "A search that named nothing and ended badly throws.",
    },
    {
      invariantKind: "departure",
      statement:
        "A search naming paths is answered with those paths though that search ended badly.",
    },
    {
      invariantKind: "departure",
      statement: "A call asking after no spelling searches nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A listing names every path the tree holds rather than the paths a spelling is in.",
    },
    {
      invariantKind: "departure",
      statement: "A listing runs the same program under the same rules a search runs under.",
    },
    {
      invariantKind: "departure",
      statement: "Every file kind is listed, and a caller wanting one kind reads it off the path.",
    },
    {
      invariantKind: "departure",
      statement: "A listing is answered in path order.",
    },
    {
      invariantKind: "departure",
      statement: "A listing names no kind, and a file the repository ignores is left unlisted.",
    },
    {
      invariantKind: "absence",
      statement: "No index is read to say which paths are there.",
    },
    {
      invariantKind: "absence",
      statement: "Which spelling a body holds is not said.",
    },
    {
      invariantKind: "absence",
      statement: "The program that searches is not looked for on the path.",
    },
  ],
} as const satisfies Module
