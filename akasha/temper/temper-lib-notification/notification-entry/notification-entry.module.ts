import type { Module } from "@akasha/code-system/module"

export const notificationEntry = {
  id: "01a0605a-0517-7516-85b8-1030a8a947e8",
  pageTypeSlug: "module",
  slug: "notification-entry",
  definition: "the global the game reads the notification library from once the addon loads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bundle the transpiler writes starts here.",
    },
    {
      invariantKind: "departure",
      statement: "A second load raises an error rather than replacing the library.",
    },
    {
      invariantKind: "departure",
      statement: "The row overrides are installed as the library is hung on the globals.",
    },
  ],
} as const satisfies Module
