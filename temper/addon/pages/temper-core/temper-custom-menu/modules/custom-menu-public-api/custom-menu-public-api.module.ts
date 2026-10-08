import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const customMenuPublicApi = {
  id: "01a0605a-581f-70cd-a87d-789035bb7e50",
  type: "page-type/module",
  slug: "custom-menu-public-api",
  definition: "the names the custom menu library puts in the game's global table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A header entry is added as a label drawn from the header pool.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkbox entry is indented by a fixed-width space.",
    },
  ],
  createdAt: "2026-09-02T04:22:08.671Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
