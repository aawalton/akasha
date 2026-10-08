import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const compareKey = {
  id: "01a08dda-ba3d-771b-88b6-4c155f7decb0",
  type: "page-type/module",
  slug: "compare-key",
  definition: "text lowered to letters and digits parted by single spaces, for comparing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run of anything but a letter or a digit becomes one space.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key carries no space at either end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A letter outside the English alphabet is no letter here.",
    },
  ],
  createdAt: "2026-09-11T00:25:17.117Z",
  updatedAt: "2026-09-22T13:44:42.000Z",
} as const satisfies Module
