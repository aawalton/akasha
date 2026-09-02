import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const storyReader = {
  id: "01a0628e-a5db-710f-96c6-55f3f7b2427a",
  pageTypeSlug: "workspace-package",
  slug: "story-reader",
  definition: "one game session shaped for the browser a player reads it in",
  manifest: "json",
  partSlugs: [
    "module/alert-notification",
    "module/alert-sound",
    "module/client-envelope",
    "module/client-session",
    "module/client-story-session",
    "module/content-frontier",
    "module/game-config",
    "module/pending-actions",
    "module/pool-bars",
    "module/prose-interleave",
    "module/quest-projection",
    "module/revealed-frontier",
    "module/session-envelope",
    "module/state-parse",
    "module/story-prose-dividers",
    "module/story-session-compose",
  ],
} as const satisfies WorkspacePackage
