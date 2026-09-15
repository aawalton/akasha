import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const routerConfig = {
  id: "01a063f3-c2b3-7593-b5da-ffa32b2e16c6",
  type: "page-type/code-file-property",
  slug: "router-config",
  propertySlug: "router-config",
  definition: "what the router is told before it reads a route",
  extensions: ["ts"],
  fileName: "react-router.config.ts",
  types: "ts",
} as const satisfies CodeFileProperty
