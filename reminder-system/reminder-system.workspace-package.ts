import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const reminderSystem = {
  id: "01a05f42-d941-7000-8906-8852e706c156",
  pageTypeSlug: "workspace-package",
  slug: "reminder-system",
  definition: "what is sent to somebody at the times it names",
  manifest: "json",
  partSlugs: ["module/due-reminder-sending", "module/reminder-sending", "page-type/reminder"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reminder is sent by a clock rather than by whoever wrote the reminder.",
    },
    {
      invariantKind: "departure",
      statement: "What a reminder is sent as is a page in akasha.",
    },
    {
      invariantKind: "departure",
      statement: "The service sending a reminder reads that reminder off the index.",
    },
    {
      invariantKind: "departure",
      statement: "When a reminder is next sent is kept beside its page rather than in the commit.",
    },
  ],
} as const satisfies WorkspacePackage
