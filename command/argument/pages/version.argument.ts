import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const version = {
  id: "01a094fd-ff99-7622-a23e-6315c3169512",
  type: "page-type/argument",
  slug: "version",
  said: "--version",
  takes: "the version the boot environment carries",
  value: "text",
  placeholder: "version",
  createdAt: "2026-09-12T09:41:09.145Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
