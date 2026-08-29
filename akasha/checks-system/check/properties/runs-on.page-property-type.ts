import type { List } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Phase } from "./phase.page-property-type.ts"

export type RunsOn = List<Phase>

export const runsOn = {
  id: "01a04bc4-7e86-7ddf-b1b3-33940c848656",
  pageTypeSlug: "page-property-type",
  slug: "runs-on",
  definition: "the phases at which a check judges a set of changes",
  extendsSlug: null,
  kind: "list",
  entrySlug: "phase",
  max: null,
  design: [
    "A check states its phases, because nothing yet derives them from what the check reads.",
    "A check runs on audit whatever it states here.",
  ],
} as const satisfies PagePropertyType
