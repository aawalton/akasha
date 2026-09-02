import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const destinationsPreviewControls = {
  id: "01a06269-2b13-7b9c-8e10-1f913f1e6553",
  pageTypeSlug: "type-declaration",
  slug: "destinations-preview-controls",
  definition:
    "the dropdown controls the destinations settings name to show an icon beside each texture choice",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A control here is made by the settings library from a reference the destinations menu passes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies TypeDeclaration
