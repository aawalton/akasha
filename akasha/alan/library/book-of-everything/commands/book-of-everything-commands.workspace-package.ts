import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const bookOfEverythingCommands = {
  id: "01a06862-5a9b-71d6-99e3-546a60266903",
  pageTypeSlug: "workspace-package",
  slug: "book-of-everything-commands",
  definition: "what an agent runs by name over how far Ali and Alan have got through the book",
  manifest: "json",
  partSlugs: [
    "command/ali-coverage",
    "command/ali-fold",
    "command/ali-next-unscored",
    "command/ali-random-leaf",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here reads the topic pages rather than any folder of books on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A topic is named by its slug rather than by a path.",
    },
  ],
} as const satisfies WorkspacePackage
