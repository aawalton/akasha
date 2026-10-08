import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const runsOnDeploy = {
  id: "01a04e26-4527-7678-b006-a173a188ea5d",
  type: "page-type/boolean-property",
  slug: "runs-on-deploy",
  propertySlug: "runs-on-deploy",
  definition: "whether a check judges a set of changes at deploy",
  types: "ts",
  createdAt: "2026-08-29T15:32:06.055Z",
  updatedAt: "2026-09-15T15:59:02.000Z",
} as const satisfies BooleanProperty
