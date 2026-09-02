import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperWatcher = {
  id: "01a06039-9c87-70d4-a728-02d7341ee89e",
  pageTypeSlug: "workspace-package",
  slug: "temper-watcher",
  definition: "what carries what Alan did in the game across to the web",
  manifest: "json",
  partSlugs: [
    "module/watcher-paths",
    "module/watcher-daemon",
    "module/watcher-log-line",
    "module/watcher-log-merging",
    "module/watcher-unit",
    "module/watcher-running",
    "module/watcher-liveness",
    "workstation-service/temper-watcher",
    "workstation-service/temper-watcher-liveness",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The worker runs from source rather than from a build.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change to the worker reaches the workstation on a restart rather than on a deploy.",
    },
    {
      invariantKind: "departure",
      statement: "One worker runs at a time.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether the watcher is carrying anything across is judged from outside the watcher.",
    },
    {
      invariantKind: "departure",
      statement: "A dead daemon reports nothing about itself.",
    },
    {
      invariantKind: "constraint",
      statement: "The watcher runs on the workstation the game writes its files on.",
    },
  ],
} as const satisfies WorkspacePackage
