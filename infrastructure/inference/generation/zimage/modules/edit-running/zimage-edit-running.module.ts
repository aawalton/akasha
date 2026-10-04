import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zimageEditRunning = {
  id: "01a10606-e2d3-7530-af8d-00c58e61abc7",
  type: "page-type/module",
  slug: "zimage-edit-running",
  definition: "one run of the edit graph over a picture's bytes, answered with the edited picture",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The picture edited is uploaded under a name its own bytes give it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seed is the caller's, so the caller can record the seed it drew.",
    },
  ],
} as const satisfies Module
