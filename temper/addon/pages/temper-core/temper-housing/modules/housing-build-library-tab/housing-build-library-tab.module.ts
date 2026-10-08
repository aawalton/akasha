import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingBuildLibraryTab = {
  id: "01a06128-d5c4-74dd-a2f6-6194d82b43c4",
  type: "page-type/module",
  slug: "housing-build-library-tab",
  definition: "building the controls of the community library tab",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Controls are built once and hidden rather than made again.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.252Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
