import type { Date as ReviewSessionDate } from "akasha/alan/track/daily/days/properties/date.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { ReviewSessionNotes } from "akasha/personas/review-sessions/properties/review-session-notes.file-property.ts"
import type { SessionPersona } from "akasha/personas/review-sessions/properties/session-persona.relation-property.types.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"

export type ReviewSession = Page & {
  title: Title
  persona: SessionPersona
  date: ReviewSessionDate
  notes: ReviewSessionNotes
  icon?: Icon
}
