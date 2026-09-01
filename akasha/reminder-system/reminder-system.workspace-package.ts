import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const reminderSystem = {
  id: "01a05f42-d941-7000-8906-8852e706c156",
  pageTypeSlug: "workspace-package",
  slug: "reminder-system",
  definition: "what is sent to somebody at the times it names",
  manifest: "json",
  partSlugs: ["page-type/reminder", "module/reminder-sending"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reminder is sent by a clock rather than by whoever wrote the reminder.",
    },
    {
      invariantKind: "gap",
      statement: "What a reminder is sent as is a page in akasha.",
    },
  ],
} as const satisfies WorkspacePackage
