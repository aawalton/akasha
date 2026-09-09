import type { FileProperty } from "@akasha/pages/file-property"

export type TunnelRoutes = "ts"

export const tunnelRoutes = {
  id: "01a07ca0-e76c-71da-8616-2c2018f4bfc0",
  pageTypeSlug: "file-property",
  slug: "tunnel-routes",
  propertySlug: "tunnel-routes",
  definition: "the hostnames a package puts through the tunnel, each with the service answering it",
  fileName: "tunnel-routes.ts",
} as const satisfies FileProperty
