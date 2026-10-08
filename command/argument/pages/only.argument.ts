import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const only = {
  id: "01a094cf-3f2f-7c14-982e-4a7e9a6c58c9",
  type: "page-type/argument",
  slug: "only",
  said: "--only",
  takes: "restrict the run to one addon folder, said once per folder",
  value: "text",
  placeholder: "dir",
  createdAt: "2026-09-12T08:50:05.231Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
