import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakGuildHistory = {
  id: "01a06115-1ac9-7fb0-8f2d-ffc398b892a8",
  type: "page-type/module",
  slug: "tweak-guild-history",
  definition: "the guild history window paged by the interface tweaks",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No shared guard is kept for the type each guard here narrows to.",
    },
  ],
  createdAt: "2026-09-02T07:46:08.201Z",
  updatedAt: "2026-09-22T13:56:18.000Z",
} as const satisfies Module
