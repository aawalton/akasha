import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type RootRoute = "tsx"

export const rootRoute = {
  id: "01a063f3-c2ad-7357-b6ab-267960198089",
  pageTypeSlug: "named-file-property",
  slug: "root-route",
  propertySlug: "root-route",
  definition: "the route every other route renders inside",
  fileName: "root.tsx",
} as const satisfies NamedFileProperty
