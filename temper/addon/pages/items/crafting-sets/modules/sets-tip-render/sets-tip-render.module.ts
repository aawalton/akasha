import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipRender = {
  id: "01a0623c-2df6-77cd-8544-af3c2c7c7dc5",
  type: "page-type/module",
  slug: "sets-tip-render",
  definition: "the set line added to a tooltip control and the check that an item warrants one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A gamepad tooltip gets its own section headed Sets.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing is added when the built text comes back empty.",
    },
  ],
  createdAt: "2026-09-02T13:08:26.230Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
