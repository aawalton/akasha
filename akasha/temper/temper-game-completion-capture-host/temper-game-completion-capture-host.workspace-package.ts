import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperGameCompletionCaptureHost = {
  id: "01a06076-5ea7-7c58-9e75-6ffc5d50efc4",
  pageTypeSlug: "workspace-package",
  slug: "temper-game-completion-capture-host",
  definition: "the zod schemas reading the completion catalogs a capture addon saved",
  manifest: "json",
  partSlugs: [
    "module/achievement-catalog-schema",
    "module/cadwell-catalog-schema",
    "module/zone-completion-catalog-schema",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A catalog here is read from a key the game already gives as a number.",
    },
  ],
} as const satisfies WorkspacePackage
