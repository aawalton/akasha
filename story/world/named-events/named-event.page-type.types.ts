import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { EventAliases } from "akasha/story/world/named-events/properties/event-aliases.text-property.types.ts"
import type { EventFirstChapter } from "akasha/story/world/named-events/properties/event-first-chapter.number-property.types.ts"
import type { EventLastChapter } from "akasha/story/world/named-events/properties/event-last-chapter.number-property.types.ts"
import type { EvidenceBeat } from "akasha/story/world/named-events/properties/evidence-beat.number-property.types.ts"
import type { EvidenceChapter } from "akasha/story/world/named-events/properties/evidence-chapter.text-property.types.ts"
import type { EvidenceNote } from "akasha/story/world/named-events/properties/evidence-note.text-property.types.ts"
import type { NamedEventKind } from "akasha/story/world/named-events/properties/named-event-kind.select-property.types.ts"
import type { World } from "akasha/story/world/stories/played/properties/world.relation-property.types.ts"

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
