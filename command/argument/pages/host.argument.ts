import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const host = {
  id: "01a094d0-8287-7d0d-be5c-e374fa79fa5e",
  type: "page-type/argument",
  slug: "host",
  said: "--host",
  takes: "which GPU the work runs on",
  value: "text",
  placeholder: "where",
  default: "cluster",
  createdAt: "2026-09-12T08:51:28.007Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
