import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperCommands = {
  id: "01a06034-110a-750a-9400-ded12725f5e1",
  pageTypeSlug: "workspace-package",
  slug: "temper-commands",
  definition: "what an agent runs by name over temper",
  manifest: "json",
  partSlugs: ["command/temper-catalog-list"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "gap",
      statement: "The temper code a command here works over is in akasha.",
    },
  ],
} as const satisfies WorkspacePackage
