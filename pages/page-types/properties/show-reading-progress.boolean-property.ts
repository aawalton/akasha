import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type ShowReadingProgress = boolean

export const showReadingProgress = {
  id: "01a0683a-620a-7829-8dc1-e42dd3e951a8",
  pageTypeSlug: "boolean-property",
  slug: "show-reading-progress",
  propertySlug: "show-reading-progress",
  definition: "whether how far through a page the reader has come stands on the screen",
  invariants: [
    {
      invariantKind: "departure",
      statement: "How far through a page the reader has come is read off two named properties.",
    },
  ],
} as const satisfies BooleanProperty
