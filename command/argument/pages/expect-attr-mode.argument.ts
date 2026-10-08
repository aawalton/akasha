import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const expectAttrMode = {
  id: "01a094ce-a2be-77bf-a98f-aab451011c09",
  type: "page-type/argument",
  slug: "expect-attr-mode",
  said: "--expect-attr-mode",
  takes: "`equals` or `contains-token`, equals where none is said",
  value: "text",
  placeholder: "mode",
  createdAt: "2026-09-12T08:49:25.182Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
