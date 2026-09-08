import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
import type { Asks } from "./properties/asks.file-property.ts"
import type { CoachingConstraintKind } from "./properties/coaching-constraint-kind.select-property.ts"
import type { CoachingConstraintSortOrder } from "./properties/coaching-constraint-sort-order.number-property.ts"
import type { CoachingConstraintActive } from "./properties/coaching-note-active.boolean-property.ts"
import type { FocusTags } from "./properties/focus-tags.select-property.ts"

export type CoachingNote = Page & {
  title: Title
  coachingConstraintActive: CoachingConstraintActive
  focusTags: readonly FocusTags[]
  coachingConstraintKind: CoachingConstraintKind
  coachingConstraintSortOrder?: CoachingConstraintSortOrder
  asks?: Asks
}

export const coachingNote = {
  id: "01a08163-3fe7-750b-bfae-42682acbbf23",
  pageTypeSlug: "page-type",
  slug: "coaching-note",
  definition: "a limit, a cue or a thing noticed that the coach programs by",
  pluralSlug: "coaching-notes",
  partSlugs: [
    "boolean-property/coaching-note-active",
    "file-property/asks",
    "number-property/coaching-constraint-sort-order",
    "select-property/coaching-constraint-kind",
    "select-property/focus-tags",
  ],
  extendsSlug: ["page-type/page"],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    {
      pagePropertySlug: "boolean-property/coaching-note-active",
      required: true,
      many: false,
    },
    { pagePropertySlug: "select-property/focus-tags", required: true, many: true, maxCount: null },
    { pagePropertySlug: "select-property/coaching-constraint-kind", required: true, many: false },
    {
      pagePropertySlug: "number-property/coaching-constraint-sort-order",
      required: false,
      many: false,
    },
    { pagePropertySlug: "file-property/asks", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A note's words are in a file of their own rather than in a value beside that note.",
    },
  ],
} as const satisfies PageType
