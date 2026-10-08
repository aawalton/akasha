import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsAddonBuildIds = {
  id: "01a060d8-0918-78cb-b1c7-2d2db0462ee2",
  type: "page-type/module",
  slug: "errors-addon-build-ids",
  definition: "which add-on a callstack blames and that add-on's build",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The blamed folder is the earliest callstack folder the build stamp knows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A callstack naming no add-on folder blames nobody.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No build stamp is needed for an error to be recorded.",
    },
  ],
  createdAt: "2026-09-02T06:39:25.976Z",
  updatedAt: "2026-09-22T13:58:42.000Z",
} as const satisfies Module
