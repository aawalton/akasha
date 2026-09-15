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
      invariantKind: "departure",
      statement: "Every tree read through here is read by one rule.",
    },
    {
      invariantKind: "departure",
      statement: "The repository root is the akasha folder itself.",
    },
    {
      invariantKind: "departure",
      statement: "The vendored packages and the quarantine are left out.",
    },
    {
      invariantKind: "departure",
      statement: "Git's own store is left out.",
    },
    {
      invariantKind: "departure",
      statement: "The index is left out.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing left out of the tree has a page of this repository's own.",
    },
    {
      invariantKind: "departure",
      statement: "Each folder left out is named rather than matched on a leading dot.",
    },
    {
      invariantKind: "departure",
      statement:
        "The quarantine is left out only where the quarantine sits at the top of the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A folder deeper down carrying that name has pages.",
    },
    {
      invariantKind: "departure",
      statement: "A folder deeper down carrying that name is read.",
    },
    {
      invariantKind: "departure",
      statement: "`.server/` under a router app has module pages a dot rule would drop.",
    },
    {
      invariantKind: "departure",
      statement: "A part naming a page left out of the tree is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page is a file whose name says a page type and no section.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a tree admits are read from that tree's own page type pages.",
    },
    {
      invariantKind: "departure",
      statement: "A caller says which file names that caller takes.",
    },
    {
      invariantKind: "departure",
      statement: "The files and folders sitting in one folder are the ones git carries there.",
    },
    {
      invariantKind: "departure",
      statement: "A file git ignores and a file git was never told of are both left out.",
    },
    {
      invariantKind: "departure",
      statement: "A folder git carries nothing in is left out however much sits in it on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A path under a folder git carries nothing in is carried by nothing either.",
    },
    {
      invariantKind: "departure",
      statement: "Git is asked what it carries rather than the ignore rules being read here.",
    },
    {
      invariantKind: "departure",
      statement:
        "What git carries is asked once for a repository and a commit, and held for the rest of the run.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming a commit is answered what git carried at that commit.",
    },
    {
      invariantKind: "departure",
      statement: "A path a commit after that one first carried is carried by nothing here.",
    },
    {
      invariantKind: "departure",
      statement:
        "What git carries now is asked before which commit that is, so a landing between them is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming no commit is answered what git carries now.",
    },
    {
      invariantKind: "departure",
      statement: "A folder git will not answer for is the folder as it sits on disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page's body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes the index.",
    },
    { invariantKind: "departure", statement: "A caller says which folders that caller enters." },
    {
      invariantKind: "departure",
      statement:
        "A caller saying nothing about folders enters every folder the rules here leave in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder a lock is held in is left out, because a lock is there only while a call runs.",
    },
  ],
} as const satisfies Module
