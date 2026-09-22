import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileRename = {
  id: "01a08238-cb67-7904-b9fc-479ade8d8cd0",
  type: "page-type/domain",
  slug: "change-mechanical-file-rename",
  definition: "a mechanical change restating a page's slug",
  parts: [
    "change-mechanical/rename-file-page",
    "change-mechanical/rename-file-page-property",
    "change-mechanical/rename-file-pages",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file's rename is that file's move.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here renames a file alone.",
    },
  ],
} as const satisfies Domain
