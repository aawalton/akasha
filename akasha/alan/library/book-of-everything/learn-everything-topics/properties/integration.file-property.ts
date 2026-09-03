import type { FileProperty } from "@akasha/pages-system/file-property"

export type Integration = "md"

export const integration = {
  id: "01a0659f-93da-700a-b63a-11def3d60f90",
  pageTypeSlug: "file-property",
  slug: "integration",
  propertySlug: "integration",
  definition: "the topics Alan connects a topic to, and how strongly",
} as const satisfies FileProperty
