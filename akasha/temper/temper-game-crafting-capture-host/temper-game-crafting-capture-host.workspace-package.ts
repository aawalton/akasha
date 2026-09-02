import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperGameCraftingCaptureHost = {
  id: "01a06076-5ea9-70e9-921a-d9738e287cea",
  pageTypeSlug: "workspace-package",
  slug: "temper-game-crafting-capture-host",
  definition: "the zod schemas reading the crafting catalogs a capture addon saved",
  manifest: "json",
  partSlugs: ["module/recipe-catalog-schema", "module/trait-research-catalog-schema"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each catalog here is a module of its own.",
    },
  ],
} as const satisfies WorkspacePackage
