import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gitPathspec = {
  id: "01a068ae-fd9c-7001-ba59-e2b9fc02888f",
  type: "page-type/module",
  slug: "git-pathspec",
  definition: "git asked which paths it ignores and which paths it tracks under a folder",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The paths git tracks under a folder are asked for by that folder alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A repository git will not answer for answers nothing rather than no path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The repository root is asked for as the folder `.` rather than as the empty string git refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The paths git ignores under a folder that the tree holds are asked for by that folder alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One run of paths asked of a repository twice is answered without asking git again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Whether a path is ignored is read from the ignore patterns rather than from the git index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path git tracks that a pattern covers is a fault of the patterns rather than a path held back.",
    },
  ],
} as const satisfies Module
