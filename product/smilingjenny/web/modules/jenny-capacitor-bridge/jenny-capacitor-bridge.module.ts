import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jennyCapacitorBridge = {
  id: "01a06558-c2cc-700b-8c63-64111f2259ac",
  type: "page-type/module",
  slug: "jenny-capacitor-bridge",
  definition: "the push-notification plugin the native shell puts on the window",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A plugin is read back only where the shell has every call this page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plugin the shell does not have is read back as null rather than thrown over.",
    },
  ],
  createdAt: "2026-09-03T03:38:30.988Z",
  updatedAt: "2026-09-15T18:37:21.000Z",
} as const satisfies Module
