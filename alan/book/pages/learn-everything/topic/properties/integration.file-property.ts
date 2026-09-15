import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const integration = {
  id: "01a0659f-93da-700a-b63a-11def3d60f90",
  type: "page-type/file-property",
  slug: "integration",
  propertySlug: "integration",
  definition: "the topics Alan connects a topic to, and how strongly",
  extensions: ["md"],
  types: "ts",
} as const satisfies FileProperty
