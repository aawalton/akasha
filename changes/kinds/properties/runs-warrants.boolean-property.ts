import type { BooleanProperty } from "../../../pages/boolean-properties/boolean-property.page-type.ts"

export type RunsWarrants = boolean

export const runsWarrants = {
  id: "01a05e19-7ffb-7e64-a651-4f26f37b2e7b",
  pageTypeSlug: "boolean-property",
  slug: "runs-warrants",
  propertySlug: "runs-warrants",
  definition: "whether warrants run on a change of this kind",
} as const satisfies BooleanProperty
