import type { Seq } from "../../alan/track/daily/days/properties/seq.number-property.ts"
import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { EventAliases } from "./properties/event-aliases.text-property.ts"
import type { EventFirstChapter } from "./properties/event-first-chapter.number-property.ts"
import type { EventLastChapter } from "./properties/event-last-chapter.number-property.ts"
import type { EvidenceBeat } from "./properties/evidence-beat.number-property.ts"
import type { EvidenceChapter } from "./properties/evidence-chapter.text-property.ts"
import type { EvidenceNote } from "./properties/evidence-note.text-property.ts"
import type { NamedEventKind } from "./properties/named-event-kind.select-property.ts"

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
