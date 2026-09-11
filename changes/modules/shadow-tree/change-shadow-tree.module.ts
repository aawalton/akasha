import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const changeShadowTree = {
  id: "01a08e11-1e9d-7287-aea2-7bdc8d2fd844",
  type: "module",
  slug: "change-shadow-tree",
  definition: "the paths under a folder, read from the tree rather than from the index",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A world answers the paths under a folder from the tree rather than from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A path an answer writes under a folder is among the paths that folder answers.",
    },
    {
      invariantKind: "departure",
      statement: "A path an answer takes away is left out of the paths that folder answers.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder the index files as a page's own is left out of the paths a folder answers.",
    },
    {
      invariantKind: "departure",
      statement: "Every file that folder has is left out with the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder left out holding no file is left out of that answer too.",
    },
    {
      invariantKind: "departure",
      statement: "A world answers which files git tracks under a folder and holds on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A repository git will not answer for answers nothing rather than no file.",
    },
  ],
} as const satisfies Module
