import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type RouterConfig = "ts"

export const routerConfig = {
  id: "01a063f3-c2b3-7593-b5da-ffa32b2e16c6",
  pageTypeSlug: "named-file-property",
  slug: "router-config",
  propertySlug: "router-config",
  definition: "what the router is told before it reads a route",
  fileName: "react-router.config.ts",
} as const satisfies NamedFileProperty
