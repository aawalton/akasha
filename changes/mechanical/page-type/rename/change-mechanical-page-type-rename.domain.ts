import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalPageTypeRename = {
  id: "01a0920e-b495-7a2a-b06e-6c090b0bf78e",
  type: "domain",
  slug: "change-mechanical-page-type-rename",
  definition: "a mechanical change restating the slug a page type is named by",
  parts: ["change-mechanical-page-type/rename-page-type-pages"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here answers for every page of the page type at once.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here renames the page type's own file.",
    },
  ],
} as const satisfies Domain
