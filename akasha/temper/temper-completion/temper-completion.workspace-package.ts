import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperCompletion = {
  id: "01a0607a-9cbb-77f0-9ede-8b04b4408831",
  pageTypeSlug: "workspace-package",
  slug: "temper-completion",
  definition: "what a player has finished across an account, a character and a companion",
  manifest: "json",
  partSlugs: [
    "module/completion-progress",
    "module/completion-record",
    "module/completion-writer-schema",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A capture is checked against a zod shape before the capture is written.",
    },
    {
      invariantKind: "gap",
      statement: "The lore library and recipe tables are here.",
    },
  ],
} as const satisfies WorkspacePackage
