import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type RunsOnAudit = boolean

export const runsOnAudit = {
  id: "01a04e28-c4b3-70c7-95e2-30175d337863",
  pageTypeSlug: "page-property-type",
  slug: "runs-on-audit",
  definition: "whether a check judges every page at audit",
  extendsSlug: null,
  kind: "boolean",
} as const satisfies PagePropertyType
