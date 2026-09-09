import type { ChangeMode } from "../change-mode.page-type.ts"

export const changeModeAddIfNotPresent = {
  id: "01a08187-ae79-7fd0-a20c-f69200d6560d",
  pageTypeSlug: "change-mode",
  type: "change-mode",
  slug: "change-mode-add-if-not-present",
  definition: "something is put there where it is not there already",
} as const satisfies ChangeMode
