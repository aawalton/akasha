import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const tunnelRoutes = {
  id: "01a0c68b-f89c-7f72-83ed-c92a3bba62a9",
  type: "page-type/record-property",
  slug: "tunnel-routes",
  propertySlug: "tunnel-routes",
  definition: "the host names a page puts through the tunnel, each with the service answering it",
  properties: [
    { pageProperty: "text-property/tunnel-route-name", required: true, many: false },
    { pageProperty: "text-property/tunnel-route-hostname", required: true, many: false },
    { pageProperty: "text-property/tunnel-route-service", required: true, many: false },
  ],
  types: "ts",
  createdAt: "2026-09-22T00:37:37.052Z",
  updatedAt: "2026-09-22T00:49:17.000Z",
} as const satisfies RecordProperty
