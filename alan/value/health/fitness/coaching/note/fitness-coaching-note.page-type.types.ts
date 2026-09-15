import type { FitnessCoachingNoteActive } from "akasha/alan/value/health/fitness/coaching/note/properties/fitness-coaching-note-active.boolean-property.types.ts"
import type { FitnessCoachingNoteDate } from "akasha/alan/value/health/fitness/coaching/note/properties/fitness-coaching-note-date.calendar-date-property.types.ts"
import type { FitnessCoachingNoteKind } from "akasha/alan/value/health/fitness/coaching/note/properties/fitness-coaching-note-kind.select-property.types.ts"
import type { FitnessCoachingNoteSortOrder } from "akasha/alan/value/health/fitness/coaching/note/properties/fitness-coaching-note-sort-order.number-property.types.ts"
import type { FocusTags } from "akasha/alan/value/health/fitness/coaching/note/properties/focus-tags.select-property.types.ts"
import type { Says } from "akasha/alan/value/health/fitness/coaching/note/properties/says.file-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type FitnessCoachingNote = Page & {
  title: Title
  active: FitnessCoachingNoteActive
  focusTags: FocusTags
  kind: FitnessCoachingNoteKind
  date?: FitnessCoachingNoteDate
  sortOrder?: FitnessCoachingNoteSortOrder
  says?: Says
}
