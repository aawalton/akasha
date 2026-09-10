import type { ChangeMode } from "../change-mode.page-type.types.ts"

export const changeModeAdd = {
  id: "01a07c24-3e2b-7d33-ab6b-a6c0b37887a2",
  pageTypeSlug: "change-mode",
  type: "change-mode",
  slug: "change-mode-add",
  definition: "something not there before is put there",
} as const satisfies ChangeMode
