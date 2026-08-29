import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type RunsOnPatch = boolean

export const runsOnPatch = {
  id: "01a04e26-4526-722e-b610-57b7d1747f40",
  pageTypeSlug: "boolean-property",
  slug: "runs-on-patch",
  definition: "whether a check judges a set of changes at patch",
} as const satisfies BooleanProperty
