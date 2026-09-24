import type { Date as ReviewSessionDate } from "akasha/alan/track/daily/day/properties/date.calendar-date-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ReviewSessionNotes } from "akasha/persona/review-session/properties/review-session-notes.file-property.types.ts"
import type { SessionPersona } from "akasha/persona/review-session/properties/session-persona.relation-property.types.ts"

export type ReviewSession = Page & {
  title: Title
  persona: SessionPersona
  date: ReviewSessionDate
  notes: ReviewSessionNotes
}
