import type { ChangeMode } from "akasha/changes/modes/change-mode.page-type.types.ts"

export const changeModeRename = {
  id: "01a07c24-72ae-7f30-98b3-45cdf253e8ad",
  type: "change-mode",
  slug: "change-mode-rename",
  definition: "something is reached by another name",
} as const satisfies ChangeMode
