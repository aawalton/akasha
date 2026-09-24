import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treeReading = {
  id: "01a07220-6ee3-7c98-b086-7e3b497e8b41",
  type: "page-type/module",
  slug: "tree-reading",
  definition: "the files under a tree, and the folders with no page of this repository's own",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every tree read through here is read by one rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The repository root is the akasha folder itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The vendored packages and the quarantine are left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Git's own store is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The index is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing left out of the tree has a page of this repository's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each folder left out is named rather than matched on a leading dot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The quarantine is left out only where the quarantine sits at the top of the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder deeper down carrying that name has pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder deeper down carrying that name is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`.server/` under a router app has module pages a dot rule would drop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part naming a page left out of the tree is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is a file whose name says a page type and no section.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page types a tree admits are read from that tree's own page type pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller says which file names that caller takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files sitting in one folder are the ones git carries there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file git ignores and a file git was never told of are both left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path under a folder git carries nothing in is carried by nothing either.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Git is asked what it carries rather than the ignore rules being read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What git carries in one folder is read from that folder's own tree in the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree is read once under a commit and held, so no folder is asked for twice.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No folder read here costs a listing of the rest of the repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller naming a commit is answered what git carried at that commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a commit after that one first carried is carried by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller naming no commit is answered what the commit the tree is at carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which commit that is is asked once for a repository and held for the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder git will not answer for is the folder as it sits on disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page's body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller says which folders that caller enters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller saying nothing about folders enters every folder the rules here leave in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A folder a lock is held in is left out, because a lock is there only while a call runs.",
    },
  ],
} as const satisfies Module
