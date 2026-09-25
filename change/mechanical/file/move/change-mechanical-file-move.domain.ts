import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileMove = {
  id: "01a07cbe-25bd-7fd0-85e4-27292828ea8d",
  type: "page-type/domain",
  slug: "change-mechanical-file-move",
  definition: "a mechanical change that moves a file",
  parts: [
    "change-mechanical-file/move-file",
    "change-mechanical-file/move-file-page",
    "change-mechanical/move-file-code",
    "change-mechanical/move-file-of-any-kind",
    "change-mechanical/move-file-page-property",
    "change-mechanical/move-file-page-type",
    "change-mechanical/move-files",
  ],
  decisions: [],
} as const satisfies Domain
