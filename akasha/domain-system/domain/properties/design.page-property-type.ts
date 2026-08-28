import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Invariant } from "./invariant.page-property-type.ts"

export type Design = Invariant

export const design = {
  id: "01a049c8-3ead-7b7f-90cf-8f8bf8bb5436",
  pageTypeSlug: "page-property-type",
  slug: "design",
  definition: "an invariant that holds now",
  extendsSlug: "invariant",
  kind: "list",
  entrySlug: "statement",
  max: null,
  design: [
    "A design entry is an invariant a reader gets wrong, in these kinds and no others: a departure, an absence, or a constraint.",
    "A departure is a decision a reader would not guess right; knowing it stops them undoing it.",
    "An absence is something the domain deliberately leaves out; knowing it stops a reader adding it.",
    "A constraint is a limit from outside the domain; knowing it stops a reader asking for the impossible.",
    "A design entry holds no instruction to a seat.",
    "A design entry carries no reason for itself.",
  ],
} as const satisfies PagePropertyType
