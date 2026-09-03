import type { Module } from "@akasha/code-system/module"

export const jennyCapacitorBridge = {
  id: "01a06558-c2cc-700b-8c63-64111f2259ac",
  pageTypeSlug: "module",
  slug: "jenny-capacitor-bridge",
  definition: "the push-notification plugin the native shell puts on the window",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A plugin is read back only where the shell holds every call this page states.",
    },
    {
      invariantKind: "departure",
      statement: "A plugin the shell does not hold is read back as null rather than thrown over.",
    },
  ],
} as const satisfies Module
