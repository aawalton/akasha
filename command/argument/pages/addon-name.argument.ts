import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const addonName = {
  id: "01a094c8-7fcd-791f-91d7-b42fd00d4f12",
  type: "page-type/argument",
  slug: "addon-name",
  said: "--addon-name",
  takes: "the name resolved: a canonical name, a flat directory leaf or a nested parent domain",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:42:43.021Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
