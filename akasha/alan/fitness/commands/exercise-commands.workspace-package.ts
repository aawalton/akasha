import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const exerciseCommands = {
  id: "01a0685c-7d81-70f4-afde-aeffd661d42e",
  pageTypeSlug: "workspace-package",
  slug: "exercise-commands",
  definition: "what an agent runs by name over Alan's training",
  manifest: "json",
  partSlugs: [
    "command/exercise-add",
    "command/exercise-constraint-list",
    "command/exercise-constraint-set",
    "command/exercise-digest",
    "command/exercise-equipment-list",
    "command/exercise-equipment-set",
    "command/exercise-history",
    "command/exercise-log-activity",
    "command/exercise-log-set",
    "command/exercise-mobility-log",
    "command/exercise-mobility-show",
    "command/exercise-next-set",
    "command/exercise-policy-show",
    "command/exercise-profile-set",
    "command/exercise-profile-show",
    "command/exercise-ranks",
    "command/exercise-schedule-create",
    "command/exercise-select",
    "command/exercise-session-finish",
    "command/exercise-session-show",
    "command/exercise-session-start",
    "command/exercise-today",
    "module/exercise-saying",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here reads and writes the checkout this code runs in.",
    },
    {
      invariantKind: "absence",
      statement: "No command here reaches the pages-system-service.",
    },
    {
      invariantKind: "departure",
      statement: "A command here answers as lines for a reader, or as JSON when `--json` is said.",
    },
  ],
} as const satisfies WorkspacePackage
