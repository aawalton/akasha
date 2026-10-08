import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const fileType = {
  id: "01a0d95d-0561-718b-b982-4e27a69bf994",
  type: "page-type/argument",
  slug: "file-type",
  said: "--file-type",
  takes: "a kind of file as ripgrep names kinds, such as `ts` or `json`",
  value: "text",
  placeholder: "kind",
  createdAt: "2026-09-25T16:19:07.233Z",
  updatedAt: "2026-09-25T16:19:30.000Z",
} as const satisfies Argument
