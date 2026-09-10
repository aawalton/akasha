import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type RunsOnRead = boolean

export const runsOnRead = {
  id: "01a04f56-55c4-7001-b905-21873f81487f",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "runs-on-read",
  propertySlug: "runs-on-read",
  definition: "whether a read hands back what this warrant names",
} as const satisfies BooleanProperty
