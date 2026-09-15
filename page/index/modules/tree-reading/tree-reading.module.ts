import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treeReading = {
  id: "01a07220-6ee3-7c98-b086-7e3b497e8b41",
  type: "module",
  slug: "tree-reading",
  definition: "the files under a tree, and the folders with no page of this repository's own",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every tree read through here is read by one rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The repository root is the akasha folder itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The vendored packages and the quarantine are left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Git's own store is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The index is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing left out of the tree has a page of this repository's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each folder left out is named rather than matched on a leading dot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The quarantine is left out only where the quarantine sits at the top of the tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder deeper down carrying that name has pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder deeper down carrying that name is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`.server/` under a router app has module pages a dot rule would drop.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part naming a page left out of the tree is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is a file whose name says a page type and no section.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page types a tree admits are read from that tree's own page type pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller says which file names that caller takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files and folders sitting in one folder are the ones git carries there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file git ignores and a file git was never told of are both left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder git carries nothing in is left out however much sits in it on disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path under a folder git carries nothing in is carried by nothing either.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Git is asked what it carries rather than the ignore rules being read here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What git carries is asked once for a repository and a commit, and held for the rest of the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller naming a commit is answered what git carried at that commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path a commit after that one first carried is carried by nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What git carries now is asked before which commit that is, so a landing between them is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller naming no commit is answered what git carries now.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder git will not answer for is the folder as it sits on disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a page's body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller says which folders that caller enters.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller saying nothing about folders enters every folder the rules here leave in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A folder a lock is held in is left out, because a lock is there only while a call runs.",
    },
  ],
} as const satisfies Module
