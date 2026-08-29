import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type RunsOnDeploy = boolean

export const runsOnDeploy = {
  id: "01a04e26-4527-7678-b006-a173a188ea5d",
  pageTypeSlug: "page-property-type",
  slug: "runs-on-deploy",
  definition: "whether a check judges a set of changes at deploy",
  extendsSlug: null,
  kind: "boolean",
} as const satisfies PagePropertyType
