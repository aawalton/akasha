import type { Domain } from "../../../../domains/domain.page-type.types.ts"

export const changeMechanicalFileMove = {
  id: "01a07cbe-25bd-7fd0-85e4-27292828ea8d",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "change-mechanical-file-move",
  definition: "a mechanical change moving a file to another path",
  parts: [
    "change-mechanical-file/move-file",
    "change-mechanical/move-file-code",
    "change-mechanical-file/move-file-page",
    "change-mechanical/move-file-of-any-kind",
    "change-mechanical/move-file-page-property",
    "change-mechanical/move-file-page-type",
  ],
  invariants: [],
} as const satisfies Domain
