import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const toAddress = {
  id: "01a09513-aee1-7e3a-8a9e-c4bb6d3526ac",
  type: "page-type/argument",
  slug: "to-address",
  said: "--to",
  takes: "who the mail goes to, said again or parted by commas",
  value: "text",
  placeholder: "addr,..",
  createdAt: "2026-09-12T10:04:50.273Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
