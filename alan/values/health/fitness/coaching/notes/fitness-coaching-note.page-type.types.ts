import type { Page } from "../../../../../../pages/page.page-type.types.ts"
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
