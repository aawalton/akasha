import type { Seq } from "akasha/alan/track/daily/days/properties/seq.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { EventAliases } from "akasha/story/named-events/properties/event-aliases.text-property.ts"
import type { EventFirstChapter } from "akasha/story/named-events/properties/event-first-chapter.number-property.types.ts"
import type { EventLastChapter } from "akasha/story/named-events/properties/event-last-chapter.number-property.types.ts"
import type { EvidenceBeat } from "akasha/story/named-events/properties/evidence-beat.number-property.types.ts"
import type { EvidenceChapter } from "akasha/story/named-events/properties/evidence-chapter.text-property.ts"
import type { EvidenceNote } from "akasha/story/named-events/properties/evidence-note.text-property.ts"
import type { NamedEventKind } from "akasha/story/named-events/properties/named-event-kind.select-property.types.ts"
import type { World } from "akasha/story/stories-played/properties/world.relation-property.types.ts"

export type NamedEvent = Page & {
  title: Title
  aliases?: EventAliases
  evidenceBeat: EvidenceBeat
  evidenceChapter: EvidenceChapter
  evidenceNote: EvidenceNote
  firstChapter?: EventFirstChapter
  namedEventKind: NamedEventKind
  lastChapter?: EventLastChapter
  seq: Seq
  world?: World
}
