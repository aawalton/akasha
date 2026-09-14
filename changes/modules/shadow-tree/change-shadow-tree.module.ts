import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const changeShadowTree = {
  id: "01a08e11-1e9d-7287-aea2-7bdc8d2fd844",
  type: "module",
  slug: "change-shadow-tree",
  definition: "the paths under a folder, read from the tree rather than from the index",
  code: "ts",
  test: "ts",
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
      statement: "A folder a page claims is left out of the paths a folder answers.",
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
      statement:
        "A world answers which files git tracks under a folder and holds on disk, with the answer laid over.",
    },
    {
      invariantKind: "departure",
      statement: "A repository git will not answer for answers nothing rather than no file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller asking whether a folder holds a file is answered without listing what that folder holds.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the tree has a file under that the change leaves holds a file.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the change writes a file under or carries a file into holds a file.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the change takes every file away from holds no file.",
    },
    {
      invariantKind: "departure",
      statement: "A folder read once is read no second time however often it is asked about.",
    },
    {
      invariantKind: "absence",
      statement: "No folder outside the checkout is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "The files a folder holds are read with the answer laid over rather than from the tree alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page the answer writes claims the files that page names.",
    },
    {
      invariantKind: "departure",
      statement: "A page the answer takes away claims no file.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the answer writes a file under is among the folders left out.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the answer takes every file away from holds no file for that answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the answer writes is among those files though git tracks that path nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path the answer takes away is left out of those files though git tracks that path.",
    },
  ],
} as const satisfies Module
