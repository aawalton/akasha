import type { PageType } from "@akasha/pages/page-type"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "../../../../../../pages/properties/title.text-property.ts"
import type { FitnessCoachingNoteActive } from "./properties/fitness-coaching-note-active.boolean-property.ts"
import type { FitnessCoachingNoteDate } from "./properties/fitness-coaching-note-date.calendar-date-property.ts"
import type { FitnessCoachingNoteKind } from "./properties/fitness-coaching-note-kind.select-property.ts"
import type { FitnessCoachingNoteSortOrder } from "./properties/fitness-coaching-note-sort-order.number-property.ts"
import type { FocusTags } from "./properties/focus-tags.select-property.ts"
import type { Says } from "./properties/says.file-property.ts"

export type FitnessCoachingNote = Page & {
  title: Title
  active: FitnessCoachingNoteActive
  focusTags: FocusTags
  kind: FitnessCoachingNoteKind
  date?: FitnessCoachingNoteDate
  sortOrder?: FitnessCoachingNoteSortOrder
  says?: Says
}

export const fitnessCoachingNote = {
  id: "01a08181-f205-7092-900f-58e2075a7529",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "fitness-coaching-note",
  definition: "a limit, a cue or a thing noticed that the coach programs by",
  pluralSlug: "fitness-coaching-notes",
  parts: [
    "boolean-property/fitness-coaching-note-active",
    "calendar-date-property/fitness-coaching-note-date",
    "file-property/says",
    "number-property/fitness-coaching-note-sort-order",
    "select-property/fitness-coaching-note-kind",
    "select-property/focus-tags",
  ],
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "boolean-property/fitness-coaching-note-active",
      required: true,
      many: false,
    },
    { pageProperty: "select-property/focus-tags", required: true, many: true, maxCount: null },
    { pageProperty: "select-property/fitness-coaching-note-kind", required: true, many: false },
    {
      pageProperty: "calendar-date-property/fitness-coaching-note-date",
      required: false,
      many: false,
    },
    {
      pageProperty: "number-property/fitness-coaching-note-sort-order",
      required: false,
      many: false,
    },
    { pageProperty: "file-property/says", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A note's words are in a file of their own rather than in a value beside that note.",
    },
  ],
} as const satisfies PageType
