import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreHeader = {
  id: "01a061fc-cee9-7c71-8e92-91595a98f1d7",
  type: "page-type/module",
  slug: "sets-core-header",
  definition: "the optional companion libraries this one uses when they are loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "TemperScrollableMenu is only taken up when its version is 2.43 or later.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words the slash commands accept are named here per language.",
    },
  ],
  createdAt: "2026-09-02T11:59:13.129Z",
  updatedAt: "2026-09-22T04:20:35.000Z",
} as const satisfies Module
