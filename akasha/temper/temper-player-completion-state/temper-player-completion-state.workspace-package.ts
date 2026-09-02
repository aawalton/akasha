import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperPlayerCompletionState = {
  id: "01a06253-d28f-7000-8979-abef0ff69650",
  pageTypeSlug: "workspace-package",
  slug: "temper-player-completion-state",
  definition: "the completion addon's saved table and the shapes read out of it",
  manifest: "json",
  partSlugs: [
    "module/completion-addon-constants",
    "module/completion-daily-writs-state",
    "module/completion-motif-knowledge",
    "module/completion-prune-characters",
    "module/completion-saved-variables",
    "module/completion-task-progress",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The saved table of the completion addon is declared in one package.",
    },
    {
      invariantKind: "departure",
      statement: "An addon reading that table depends on this package rather than on an addon.",
    },
    {
      invariantKind: "departure",
      statement: "A shape two addons both name is declared here rather than in either of them.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the game's own numbers into akasha ids.",
    },
  ],
} as const satisfies WorkspacePackage
