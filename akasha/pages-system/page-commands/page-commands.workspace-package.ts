import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pageCommands = {
  id: "01a06812-3ce8-79c7-b7c0-ca183f330ca5",
  pageTypeSlug: "workspace-package",
  slug: "page-commands",
  definition: "what an agent runs by name over the pages themselves",
  manifest: "json",
  partSlugs: [
    "command/page-secret-clear",
    "command/page-secret-reveal",
    "command/page-secret-set",
    "command/page-secret-show",
    "module/page-secret-acting",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A command here acts on what stands beside a page rather than on the page.",
    },
  ],
} as const satisfies WorkspacePackage
