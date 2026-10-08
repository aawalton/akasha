import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipSettingsState = {
  id: "01a0623c-2df6-79c8-86f2-4a92326c6cf2",
  type: "page-type/module",
  slug: "sets-tip-settings-state",
  definition: "the settings menu handle and the flag saying it has been built",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The built flag is kept per input mode in a two-key map.",
    },
  ],
  createdAt: "2026-09-02T13:08:26.230Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
