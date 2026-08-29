import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type RunsOnPatch = boolean

export const runsOnPatch = {
  id: "01a04e26-4526-722e-b610-57b7d1747f40",
  pageTypeSlug: "page-property-type",
  slug: "runs-on-patch",
  definition: "whether a check judges a set of changes at patch",
  extendsSlug: null,
  kind: "boolean",
} as const satisfies PagePropertyType
