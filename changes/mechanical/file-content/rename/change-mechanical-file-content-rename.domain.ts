import type { Domain } from "../../../../domains/domain.page-type.types.ts"

export const changeMechanicalFileContentRename = {
  id: "01a07cc0-05e8-7a25-818b-3795f0fc2ef1",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-mechanical-file-content-rename",
  definition: "a mechanical change spelling a name anew in what a file holds",
  parts: [
    "change-mechanical-file-content/change-imports",
    "change-mechanical-file-content/rename-export",
    "change-mechanical-file-content/rename-local-variable",
    "change-mechanical-file-content/rename-page-address",
    "change-mechanical-file-content/rename-page-property-key",
    "change-mechanical-file-content/rename-page-slug",
    "change-mechanical-file-content/rename-property-signature",
    "change-mechanical-file-content/rename-page-addresses",
    "change-mechanical-file-content/rename-entry-key",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here spells a name anew inside a body the caller names.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here has a file, so no rung here leaves an edge into a file hanging.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here names a guard.",
    },
    {
      invariantKind: "departure",
      statement: "The change composing these rungs judges the edges the whole rename leaves.",
    },
  ],
} as const satisfies Domain
