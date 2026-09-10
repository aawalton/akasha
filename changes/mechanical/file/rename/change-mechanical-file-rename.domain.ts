import type { Domain } from "../../../../domains/domain.page-type.types.ts"

export const changeMechanicalFileRename = {
  id: "01a08238-cb67-7904-b9fc-479ade8d8cd0",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-mechanical-file-rename",
  definition: "a mechanical change restating the slug a page is named by",
  parts: [
    "change-mechanical/rename-file-page",
    "change-mechanical/rename-file-page-property",
    "change-mechanical/rename-file-page-type",
    "change-mechanical/rename-file-pages",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file's rename is that file's move.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here renames a file alone.",
    },
  ],
} as const satisfies Domain
