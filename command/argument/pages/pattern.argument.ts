import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const pattern = {
  id: "01a0d95d-0562-7fff-8efd-08b3cf382b77",
  type: "page-type/argument",
  slug: "pattern",
  said: "--pattern",
  takes: "the regular expression looked for, as ripgrep reads one",
  value: "text",
  placeholder: "pattern",
  createdAt: "2026-09-25T16:19:07.234Z",
  updatedAt: "2026-09-25T16:19:30.000Z",
} as const satisfies Argument
