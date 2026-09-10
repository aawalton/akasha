import type { Date as ReviewSessionDate } from "../../alan/track/daily/days/properties/date.text-property.ts"
import type { Page } from "../../pages/page.page-type.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { Icon } from "../../temper/things/properties/icon.text-property.ts"
import type { ReviewSessionNotes } from "./properties/review-session-notes.file-property.ts"
import type { SessionPersona } from "./properties/session-persona.relation-property.ts"

export type ReviewSession = Page & {
  title: Title
  persona: SessionPersona
  date: ReviewSessionDate
  notes: ReviewSessionNotes
  icon?: Icon
}
