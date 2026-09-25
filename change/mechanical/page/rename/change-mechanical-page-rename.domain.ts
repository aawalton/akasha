import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalPageRename = {
  id: "01a08238-cb67-7904-b9fc-479ade8d8cd0",
  type: "page-type/domain",
  slug: "change-mechanical-page-rename",
  definition: "a mechanical change that changes a page's name",
  parts: [
    "change-mechanical/rename-page",
    "change-mechanical/rename-page-page-property",
    "change-mechanical/rename-pages",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's rename moves that page to where its new slug says.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here renames a file apart from the page that file sits beside.",
    },
  ],
} as const satisfies Domain
