import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const domain = {
  id: "01a07c03-e381-7406-89c5-7c74061fd947",
  type: "page-type/namespace",
  slug: "domain",
  definition: "the domains this repository has, drawn or handed over",
  parts: ["command/domain-dag", "command/domain-declaration-list", "module/domain-drawing"],
  name: "domain",
  createdAt: "2026-09-07T13:17:04.769Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
