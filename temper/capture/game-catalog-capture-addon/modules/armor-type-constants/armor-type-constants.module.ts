import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorTypeConstants = {
  id: "01a06127-661f-7ab9-8fd2-c12787790998",
  type: "page-type/module",
  slug: "armor-type-constants",
  definition: "the armor weight numbers the game client has, each under the client's own spelling",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each number is read out of the client rather than written down here.",
    },
  ],
  createdAt: "2026-09-02T08:06:07.135Z",
  updatedAt: "2026-09-22T14:05:35.000Z",
} as const satisfies Module
