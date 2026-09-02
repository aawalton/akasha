import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperLorebooks = {
  id: "01a06176-9c44-7c00-8a3b-7cf902e62430",
  pageTypeSlug: "workspace-package",
  slug: "temper-lorebooks",
  definition:
    "the lore books of Tamriel, drawn where a player must go to read one they have not read",
  manifest: "json",
  partSlugs: [
    "type-declaration/lorebooks-controls",
    "type-declaration/lorebooks-string-ids",
    "module/lorebooks-types",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here reaches a Date.",
    },
    {
      invariantKind: "departure",
      statement: "The text here is English alone.",
    },
    {
      invariantKind: "gap",
      statement: "Akasha holds no map pin for a lore book.",
    },
    {
      invariantKind: "gap",
      statement: "Akasha names 4328 of the 4773 book titles this table carries.",
    },
  ],
} as const satisfies WorkspacePackage
