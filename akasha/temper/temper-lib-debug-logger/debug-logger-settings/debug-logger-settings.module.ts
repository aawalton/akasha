import type { Module } from "@akasha/code-system/module"

export const debugLoggerSettings = {
  id: "01a06061-408f-7b57-ae4e-cf8306102001",
  pageTypeSlug: "module",
  slug: "debug-logger-settings",
  definition: "the saved settings and the slash command reading and changing them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A setting absent from the saved table takes the default.",
    },
    {
      invariantKind: "departure",
      statement: "A saved setting the defaults no longer name is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The slash command prints through the chat library where that library is loaded.",
    },
  ],
} as const satisfies Module
