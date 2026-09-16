import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { EventAliases } from "akasha/story/named-event/properties/event-aliases.text-property.types.ts"
import type { EventFirstChapter } from "akasha/story/named-event/properties/event-first-chapter.number-property.types.ts"
import type { EventLastChapter } from "akasha/story/named-event/properties/event-last-chapter.number-property.types.ts"
import type { EvidenceBeat } from "akasha/story/named-event/properties/evidence-beat.number-property.types.ts"
import type { EvidenceChapter } from "akasha/story/named-event/properties/evidence-chapter.text-property.types.ts"
import type { EvidenceNote } from "akasha/story/named-event/properties/evidence-note.text-property.types.ts"
import type { NamedEventKind } from "akasha/story/named-event/properties/named-event-kind.select-property.types.ts"
import type { World } from "akasha/story/played/properties/world.relation-property.types.ts"

export type NamedEvent = Page & {
  title: Title
  aliases?: EventAliases
  evidenceBeat: EvidenceBeat
  evidenceChapter: EvidenceChapter
  evidenceNote: EvidenceNote
  firstChapter?: EventFirstChapter
  namedEventKind: NamedEventKind
  lastChapter?: EventLastChapter
  world?: World
}
