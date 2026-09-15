import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mentionChip = {
  id: "01a061df-fe7f-7005-b349-3f1a9f8520a8",
  type: "page-type/module",
  slug: "mention-chip",
  definition: "A page mentioned inside prose, shown as a chip linking to that page.",
  code: "tsx",
} as const satisfies Module
