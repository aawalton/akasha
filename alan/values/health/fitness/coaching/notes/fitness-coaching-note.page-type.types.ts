import type { FitnessCoachingNoteActive } from "akasha/alan/values/health/fitness/coaching/notes/properties/fitness-coaching-note-active.boolean-property.types.ts"
import type { FitnessCoachingNoteDate } from "akasha/alan/values/health/fitness/coaching/notes/properties/fitness-coaching-note-date.calendar-date-property.types.ts"
import type { FitnessCoachingNoteKind } from "akasha/alan/values/health/fitness/coaching/notes/properties/fitness-coaching-note-kind.select-property.types.ts"
import type { FitnessCoachingNoteSortOrder } from "akasha/alan/values/health/fitness/coaching/notes/properties/fitness-coaching-note-sort-order.number-property.types.ts"
import type { FocusTags } from "akasha/alan/values/health/fitness/coaching/notes/properties/focus-tags.select-property.types.ts"
import type { Says } from "akasha/alan/values/health/fitness/coaching/notes/properties/says.file-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type FitnessCoachingNote = Page & {
  title: Title
  active: FitnessCoachingNoteActive
  focusTags: FocusTags
  kind: FitnessCoachingNoteKind
  date?: FitnessCoachingNoteDate
  sortOrder?: FitnessCoachingNoteSortOrder
  says?: Says
}
