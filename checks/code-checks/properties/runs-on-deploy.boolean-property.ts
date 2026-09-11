import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const runsOnDeploy = {
  id: "01a04e26-4527-7678-b006-a173a188ea5d",
  type: "boolean-property",
  slug: "runs-on-deploy",
  propertySlug: "runs-on-deploy",
  definition: "whether a check judges a set of changes at deploy",
  types: "ts",
} as const satisfies BooleanProperty
