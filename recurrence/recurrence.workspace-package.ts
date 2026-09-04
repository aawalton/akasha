import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const recurrence = {
  id: "01a05c6f-c7c2-7806-b684-baa6549863dc",
  pageTypeSlug: "workspace-package",
  slug: "recurrence",
  definition: "when a repeating thing next falls due",
  manifest: "json",
  partSlugs: ["module/recurrence-shape", "module/parsing", "module/labeling", "module/scheduling"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A recurrence is stored as an rrule string and read back from the rrule string.",
    },
    {
      invariantKind: "departure",
      statement: "A rule that cannot be said back in English is refused rather than stored.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The caller states what now is.",
    },
  ],
} as const satisfies WorkspacePackage
