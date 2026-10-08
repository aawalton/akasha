import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const domain = {
  id: "01a094cf-a9b1-79b8-a44c-c196bc2a76d3",
  type: "page-type/argument",
  slug: "domain",
  said: "--domain",
  takes: "a catalog domain to collect again, said once per domain",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:50:32.497Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
