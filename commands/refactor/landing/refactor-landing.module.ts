import type { Module } from "@akasha/code-system/module"

export const refactorLanding = {
  id: "01a0598f-bfa7-7000-b416-cf0c3639e042",
  pageTypeSlug: "module",
  slug: "refactor-landing",
  definition: "the bodies a rename respelled, landed as one commit",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every act respelling bodies lands them through this module.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read from the commit the rename stood on.",
    },
    {
      invariantKind: "departure",
      statement: "A path standing in no such commit refuses the whole rename.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of every body that landed is carried with the landing.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is carried only where the landing was clean.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run says what the dry run would land and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "What an act says about its own rename is handed in rather than worked out here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out what a rename would change.",
    },
    {
      invariantKind: "absence",
      statement: "No file is carried and no path changes.",
    },
    {
      invariantKind: "gap",
      statement: "No test stands over what lands here.",
    },
  ],
} as const satisfies Module
