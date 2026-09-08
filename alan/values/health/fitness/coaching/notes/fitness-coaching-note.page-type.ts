import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../../../../pages/properties/title.text-property.ts"
import type { CoachingNoteActive } from "./properties/fitness-coaching-note-active.boolean-property.ts"
import type { CoachingNoteDate } from "./properties/fitness-coaching-note-date.calendar-date-property.ts"
import type { CoachingNoteKind } from "./properties/fitness-coaching-note-kind.select-property.ts"
import type { CoachingNoteSortOrder } from "./properties/fitness-coaching-note-sort-order.number-property.ts"
import type { FocusTags } from "./properties/focus-tags.select-property.ts"
import type { Says } from "./properties/says.file-property.ts"

export type FitnessCoachingNote = Page & {
  title: Title
  coachingNoteActive: CoachingNoteActive
  focusTags: readonly FocusTags[]
  coachingNoteKind: CoachingNoteKind
  coachingNoteDate?: CoachingNoteDate
  coachingNoteSortOrder?: CoachingNoteSortOrder
  asks?: Says
}

export const fitnessCoachingNote = {
  id: "01a08181-f205-7092-900f-58e2075a7529",
  pageTypeSlug: "page-type",
  slug: "fitness-coaching-note",
  definition: "a limit, a cue or a thing noticed that the coach programs by",
  pluralSlug: "fitness-coaching-notes",
  partSlugs: [
    "boolean-property/fitness-coaching-note-active",
    "calendar-date-property/fitness-coaching-note-date",
    "file-property/says",
    "number-property/fitness-coaching-note-sort-order",
    "select-property/fitness-coaching-note-kind",
    "select-property/focus-tags",
  ],
  extendsSlug: ["page-type/page"],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    {
      pagePropertySlug: "boolean-property/fitness-coaching-note-active",
      required: true,
      many: false,
    },
    { pagePropertySlug: "select-property/focus-tags", required: true, many: true, maxCount: null },
    { pagePropertySlug: "select-property/fitness-coaching-note-kind", required: true, many: false },
    {
      pagePropertySlug: "calendar-date-property/fitness-coaching-note-date",
      required: false,
      many: false,
    },
    {
      pagePropertySlug: "number-property/fitness-coaching-note-sort-order",
      required: false,
      many: false,
    },
    { pagePropertySlug: "file-property/says", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A note's words are in a file of their own rather than in a value beside that note.",
    },
  ],
} as const satisfies PageType
