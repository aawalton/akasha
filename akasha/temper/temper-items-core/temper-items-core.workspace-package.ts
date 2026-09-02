import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperItemsCore = {
  id: "01a060bf-747b-7eda-a723-f1700350219d",
  pageTypeSlug: "workspace-package",
  slug: "temper-items-core",
  definition: "what an item is, read off what the game hands out about it",
  manifest: "json",
  partSlugs: ["module/item-link-parser"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item is known by the fields its own link carries.",
    },
    {
      invariantKind: "absence",
      statement: "No code here reaches the game.",
    },
  ],
} as const satisfies WorkspacePackage
