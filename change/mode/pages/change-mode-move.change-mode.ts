import type { ChangeMode } from "akasha/change/mode/change-mode.page-type.types.ts"

export const changeModeMove = {
  id: "01a07c24-5828-7b76-9988-c1b5cfbf8c5a",
  type: "page-type/change-mode",
  slug: "change-mode-move",
  definition: "something is moved to another place",
} as const satisfies ChangeMode
