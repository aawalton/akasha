import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreSetChecking = {
  id: "01a061fc-ceeb-7357-a58d-cb080d3977c2",
  type: "page-type/module",
  slug: "sets-core-set-checking",
  definition: "whether a set id still exists in the game at the API version now running",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A set is judged to exist only when an item id of that set builds a link the game names.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A set id found inactive is remembered as inactive until the caches are cleared.",
    },
  ],
  createdAt: "2026-09-02T11:59:13.131Z",
  updatedAt: "2026-09-25T14:32:32.000Z",
} as const satisfies Module
