import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const gitPathspec = {
  id: "01a068ae-fd9c-7001-ba59-e2b9fc02888f",
  type: "module",
  slug: "git-pathspec",
  definition: "git asked which paths it ignores and which paths it tracks under a folder",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The paths git tracks under a folder are asked for by that folder alone.",
    },
    {
      invariantKind: "departure",
      statement: "A repository git will not answer for answers nothing rather than no path.",
    },
    {
      invariantKind: "departure",
      statement:
        "The repository root is asked for as the folder `.` rather than as the empty string git refuses.",
    },
    {
      invariantKind: "departure",
      statement:
        "The paths git ignores under a folder that the tree holds are asked for by that folder alone.",
    },
  ],
} as const satisfies Module
