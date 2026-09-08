import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileRename = {
  id: "01a08238-cb67-7904-b9fc-479ade8d8cd0",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-rename",
  definition: "a mechanical change restating the slug a page is named by",
  partSlugs: [
    "change-mechanical/rename-file-page",
    "change-mechanical/rename-file-page-property",
    "change-mechanical/rename-file-page-type",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file's rename is that file's carry, so nothing here renames a file alone.",
    },
    {
      invariantKind: "gap",
      statement:
        "A page type owning its folder is renamed by nothing, its folders being left behind.",
    },
  ],
} as const satisfies Domain
