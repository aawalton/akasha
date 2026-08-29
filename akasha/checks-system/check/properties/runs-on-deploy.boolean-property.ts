import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type RunsOnDeploy = boolean

export const runsOnDeploy = {
  id: "01a04e26-4527-7678-b006-a173a188ea5d",
  pageTypeSlug: "boolean-property",
  slug: "runs-on-deploy",
  definition: "whether a check judges a set of changes at deploy",
} as const satisfies BooleanProperty
