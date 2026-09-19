import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const tunnelRoutes = {
  id: "01a07ca0-e76c-71da-8616-2c2018f4bfc0",
  type: "page-type/code-file-property",
  slug: "tunnel-routes",
  propertySlug: "tunnel-routes",
  definition: "the hostnames a folder puts through the tunnel, each with the service answering it",
  extensions: ["ts"],
  fileName: "tunnel-routes.ts",
  types: "ts",
  fixedExport: ["routes"],
} as const satisfies CodeFileProperty
