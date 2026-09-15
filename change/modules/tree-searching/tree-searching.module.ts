import type { Module } from "akasha/code/module/module.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement: "Every spelling asked after is searched for in one run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A spelling is matched as written letters rather than as a pattern.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file kinds searched are the ones the caller names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The git folder and the packages folder and the index folder are left unsearched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the search names is answered against the root that search was handed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller handing a root rather than a world is answered every path the search names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the repository ignores is left unsearched where the caller names no kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file a named kind matches is searched though the repository ignores that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder the repository ignores is left unsearched whatever kinds are named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body no commit holds yet is searched though the repository ignores it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the answer so far writes is answered beside the paths the search names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the answer so far writes is answered though no body sits on disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the answer so far takes away is left out though the search names it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the answer so far moves is answered at the path moved to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A search that named nothing and ended badly throws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A search naming paths is answered with those paths though that search ended badly.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call asking after no spelling searches nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A listing names every path the tree holds rather than the paths a spelling is in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A listing runs the same program under the same rules a search runs under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file kind is listed, and a caller wanting one kind reads it off the path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A listing is answered in path order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "How many threads a listing takes is the caller's to say.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller saying nothing is answered as fast as the machine allows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller held to a processor ceiling says one thread, spending less of what it is held to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A listing names no kind, and a file the repository ignores is left unlisted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A listing narrowed to kinds leaves out a file the repository ignores all the same.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind is named to such a listing as a type rather than as a glob.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A glob would take precedence over what the repository ignores, and a type does not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A listing narrowed to no kind lists nothing rather than everything.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No index is read to say which paths are there.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Which spelling a body holds is not said.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The program that searches is not looked for on the path.",
    },
  ],
} as const satisfies Module
