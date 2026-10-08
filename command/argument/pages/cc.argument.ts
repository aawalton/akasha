import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const cc = {
  id: "01a094ee-b9fa-77ae-ac4b-082bc0283471",
  type: "page-type/argument",
  slug: "cc",
  said: "--cc",
  takes: "who is copied, said again or parted by commas",
  value: "text",
  placeholder: "addr,..",
  createdAt: "2026-09-12T09:24:28.282Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
