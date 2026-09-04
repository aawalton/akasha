import type { Module } from "@akasha/code-system/module"

export const useMarkNotificationRead = {
  id: "01a064b3-9ea3-75bb-a562-5ce83ef4b622",
  pageTypeSlug: "module",
  slug: "use-mark-notification-read",
  definition: "a notification marked read the first time a reader opens it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a page of the notification page type is marked read.",
    },
    {
      invariantKind: "departure",
      statement: "A notification already carrying a read time is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is marked before the page itself has been read back.",
    },
    {
      invariantKind: "departure",
      statement: "One mounting marks one notification once.",
    },
  ],
} as const satisfies Module
