import type { ChangeMode } from "akasha/changes/modes/change-mode.page-type.types.ts"

export const changeModeAppend = {
  id: "01a08c36-b0f4-73a7-a602-9dc270b3c61e",
  type: "change-mode",
  slug: "change-mode-append",
  definition: "something is put at the end of what is there already",
} as const satisfies ChangeMode
