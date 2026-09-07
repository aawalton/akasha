import type { Namespace } from "../namespace.page-type.ts"

export const domain = {
  id: "01a07c03-e381-7406-89c5-7c74061fd947",
  pageTypeSlug: "namespace",
  slug: "domain",
  definition: "the domains this repository carries, drawn or handed over",
  partSlugs: ["command/domain-dag", "command/domain-declarations", "command/domain-tree"],
} as const satisfies Namespace
