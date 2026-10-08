import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const instruct = {
  id: "01a094eb-2abc-7a6f-9ba0-75646b785e0d",
  type: "page-type/argument",
  slug: "instruct",
  said: "--instruct",
  takes: "the voice described in words",
  value: "text",
  placeholder: "description",
  createdAt: "2026-09-12T09:20:35.004Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
