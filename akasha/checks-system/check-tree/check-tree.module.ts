import type { Module } from "@akasha/code-system/module"

export const checkTree = {
  id: "01a05e07-148f-75b7-9d0f-3ce4e79f500e",
  pageTypeSlug: "module",
  slug: "check-tree",
  definition: "a scratch repository holding the akasha folder, for a check to be run against",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The akasha folder is copied out of the working tree rather than out of git.",
    },
    {
      invariantKind: "departure",
      statement: "The scratch repository is at the commit the working tree's HEAD names.",
    },
    {
      invariantKind: "departure",
      statement: "It borrows the objects of the repository it was copied from.",
    },
    {
      invariantKind: "departure",
      statement: "It holds a copy of the index rather than a link to it.",
    },
    {
      invariantKind: "departure",
      statement: "A package the akasha folder holds is answered from inside the scratch.",
    },
    {
      invariantKind: "departure",
      statement: "Every other package is answered from the repository it was copied from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the repository it was copied from.",
    },
    {
      invariantKind: "gap",
      statement: "A workspace outside the akasha folder is copied too.",
    },
  ],
} as const satisfies Module
