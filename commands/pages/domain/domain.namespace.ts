import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const domain = {
  id: "01a07c03-e381-7406-89c5-7c74061fd947",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "domain",
  definition: "the domains this repository has, drawn or handed over",
  parts: ["command/domain-dag", "command/domain-declarations", "command/domain-tree"],
} as const satisfies Namespace
