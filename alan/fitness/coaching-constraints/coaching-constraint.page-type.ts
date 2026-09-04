import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/pages/properties/title.text-property.ts"
import type { Asks } from "./properties/asks.file-property.ts"
import type { CoachingConstraintActive } from "./properties/coaching-constraint-active.boolean-property.ts"
import type { CoachingConstraintKind } from "./properties/coaching-constraint-kind.select-property.ts"
import type { CoachingConstraintSortOrder } from "./properties/coaching-constraint-sort-order.number-property.ts"
import type { FocusTags } from "./properties/focus-tags.select-property.ts"

export type CoachingConstraint = Page & {
  title: Title
  coachingConstraintActive: CoachingConstraintActive
  focusTags: readonly FocusTags[]
  coachingConstraintKind: CoachingConstraintKind
  coachingConstraintSortOrder?: CoachingConstraintSortOrder
  asks?: Asks
}

export const coachingConstraint = {
  id: "01a0657a-fe00-7ede-8673-31bd45c097cd",
  pageTypeSlug: "page-type",
  slug: "coaching-constraint",
  definition: "a standing limit or cue the coach programs within",
  pluralSlug: "coaching-constraints",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/coaching-constraint-active",
    "file-property/asks",
    "number-property/coaching-constraint-sort-order",
    "select-property/coaching-constraint-kind",
    "select-property/focus-tags",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "coaching-constraint-active", required: true, many: false },
    { pagePropertySlug: "focus-tags", required: true, many: true, max: null },
    { pagePropertySlug: "coaching-constraint-kind", required: true, many: false },
    { pagePropertySlug: "coaching-constraint-sort-order", required: false, many: false },
    { pagePropertySlug: "asks", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What a constraint asks for stands in its own file rather than in a value beside it.",
    },
  ],
} as const satisfies PageType
