import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const size = {
  id: "01a094b8-ec4d-7422-a38e-351bb5a46bbe",
  type: "page-type/argument",
  slug: "size",
  said: "--size",
  takes: "the size the render is fixed to",
  value: "text",
  placeholder: "size",
  createdAt: "2026-09-12T08:25:42.221Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
