import type { Domain } from "../../../../domains/domain.page-type.ts"

export const changeMechanicalFileMove = {
  id: "01a07cbe-25bd-7fd0-85e4-27292828ea8d",
  pageTypeSlug: "domain",
  slug: "change-mechanical-file-move",
  definition: "a mechanical change carrying a file to another path",
  partSlugs: [
    "change-mechanical-file/move-file",
    "change-mechanical/move-file-code",
    "change-mechanical-file/move-file-page",
    "change-mechanical/move-file-of-any-kind",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement:
        "No change here carries a page type's own file, a page type's carry being its folder's.",
    },
    {
      invariantKind: "absence",
      statement:
        "No change here carries a page property's own file, that file being a page like any other.",
    },
    {
      invariantKind: "departure",
      statement: "A file's rename is that file's carry, so no rename family sits beside this one.",
    },
  ],
} as const satisfies Domain
