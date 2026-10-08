import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const fromInitiative = {
  id: "01a094d2-263a-7a8c-ab8d-b372d59fae37",
  type: "page-type/argument",
  slug: "from-initiative",
  said: "--from",
  takes: "the initiative stating the intent now",
  value: "text",
  placeholder: "from",
  createdAt: "2026-09-12T08:53:15.450Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
