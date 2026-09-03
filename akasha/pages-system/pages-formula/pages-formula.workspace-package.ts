import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pagesFormula = {
  id: "01a05c11-6371-7000-a89b-24a0df9c6ff2",
  pageTypeSlug: "workspace-package",
  slug: "pages-formula",
  definition: "the small language a page's own values are worked out in",
  manifest: "json",
  partSlugs: [
    "list/formula-functions",
    "list/formula-operators",
    "list/formula-values",
    "module/formula-check",
    "module/formula-held",
    "module/formula-language",
    "module/formula-reading",
    "module/formula-refusal",
    "module/formula-run",
    "module/formula-tokens",
    "module/formula-tree",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A formula answers absent where the formula cannot answer.",
    },
    {
      invariantKind: "departure",
      statement: "A formula that has been checked never throws.",
    },
    {
      invariantKind: "departure",
      statement: "A formula is read and checked before the formula runs.",
    },
    {
      invariantKind: "departure",
      statement: "A checked formula runs over many pages.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file or reaches a store.",
    },
    {
      invariantKind: "gap",
      statement: "The cases saying what this language means stand outside akasha.",
    },
  ],
} as const satisfies WorkspacePackage
