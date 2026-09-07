import type { WorkspacePackage } from "@akasha/code/workspace-package"

export const exerciseCommands = {
  id: "01a0685c-7d81-70f4-afde-aeffd661d42e",
  pageTypeSlug: "workspace-package",
  slug: "exercise-commands",
  definition: "what an agent runs by name over Alan's training",
  manifest: "json",
  partSlugs: ["module/exercise-said", "module/exercise-saying"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here reads and writes the checkout this code runs in.",
    },
    {
      invariantKind: "absence",
      statement: "No command here reaches the pages-service over the network.",
    },
    {
      invariantKind: "departure",
      statement: "A command here answers as lines for a reader or as JSON when `--json` is said.",
    },
    {
      invariantKind: "departure",
      statement: "A command here refuses rather than throwing.",
    },
    {
      invariantKind: "departure",
      statement: "A refused call here changes nothing.",
    },
    {
      invariantKind: "gap",
      statement:
        "Two modules read the words a call was handed rather than one module reading those words.",
    },
    {
      invariantKind: "gap",
      statement:
        "The readings a pre-session digest would gather are reached one command at a time.",
    },
  ],
} as const satisfies WorkspacePackage
