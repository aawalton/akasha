import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const color = {
  id: "01a0a03c-3a43-70c6-bfab-f57c26d395bb",
  type: "page-type/argument",
  slug: "color",
  said: "--color",
  takes: "the side of the board taken, `white` or `black`",
  value: "text",
  placeholder: "side",
  default: "white",
  createdAt: "2026-09-14T14:04:56.771Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
