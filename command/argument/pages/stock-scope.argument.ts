import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const stockScope = {
  id: "01a094b9-333e-781a-bebb-dcf3044d0e7a",
  type: "page-type/argument",
  slug: "stock-scope",
  said: "--stock-scope",
  takes: "whether stocking counts one character or every character",
  value: "text",
  placeholder: "scope",
  createdAt: "2026-09-12T08:26:00.382Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
