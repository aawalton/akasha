import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"
import type { Invariant } from "./invariant.page-property-type.ts"

export type Design = Invariant

export const design = {
  id: "01a049c8-3ead-7b7f-90cf-8f8bf8bb5436",
  pageTypeSlug: "page-property-type",
  slug: "design",
  definition: "an invariant that holds now",
  extendsSlug: "page-property-type/invariant",
  kind: "list",
  entrySlug: "statement",
  max: null,
  design: [
    "A design entry is an invariant a reader gets wrong, in these kinds and no others: a departure, an absence, or a constraint.",
    "A departure is a decision a reader would not guess right; knowing it stops them undoing it.",
    "An absence is something the domain deliberately leaves out; knowing it stops a reader adding it.",
    "A constraint is a limit from outside the domain; knowing it stops a reader asking for the impossible.",
  ],
  rule: [
    {
      name: "Move When It Goes False",
      act: "Move a design entry to intent when you find it false, never noting the breach where it broke.",
      warrant:
        "A design line is read as true, so one left standing false misleads every page beneath it.",
      aids: [
        "Move only the part of a line that has gone false.",
        "A fix not yet in hand is no reason to leave it.",
      ],
    },
  ],
} as const satisfies PagePropertyType
