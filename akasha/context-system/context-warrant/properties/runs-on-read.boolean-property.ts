import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type RunsOnRead = boolean

export const runsOnRead = {
  id: "01a04f56-55c4-7001-b905-21873f81487f",
  pageTypeSlug: "boolean-property",
  slug: "runs-on-read",
  definition: "whether a read hands back what this warrant names",
} as const satisfies BooleanProperty
