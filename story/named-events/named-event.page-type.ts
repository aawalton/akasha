import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Seq } from "../../alan/tracking/daily/wake-days/properties/seq.number-property.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { WorldSlug } from "../stories-played/properties/world-slug.relation-property.ts"
import type { EventAliases } from "./properties/event-aliases.text-property.ts"
import type { EventFirstChapter } from "./properties/event-first-chapter.number-property.ts"
import type { EventLastChapter } from "./properties/event-last-chapter.number-property.ts"
import type { EvidenceBeat } from "./properties/evidence-beat.number-property.ts"
import type { EvidenceChapter } from "./properties/evidence-chapter.text-property.ts"
import type { EvidenceNote } from "./properties/evidence-note.text-property.ts"
import type { NamedEventKind } from "./properties/named-event-kind.select-property.ts"

export type NamedEvent = Page & {
  title: Title
  aliases?: readonly EventAliases[]
  evidenceBeat: EvidenceBeat
  evidenceChapter: EvidenceChapter
  evidenceNote: EvidenceNote
  firstChapter?: EventFirstChapter
  namedEventKind: NamedEventKind
  lastChapter?: EventLastChapter
  seq: Seq
  worldSlug: WorldSlug
}

export const namedEvent = {
  id: "01a0658b-9f41-7cc1-93d8-f47f7aa3b771",
  pageTypeSlug: "page-type",
  slug: "named-event",
  definition: "something happening once in a story that its people afterwards date other things by",
  pluralSlug: "named-events",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "number-property/evidence-beat",
    "number-property/event-first-chapter",
    "number-property/event-last-chapter",
    "select-property/named-event-kind",
    "text-property/event-aliases",
    "text-property/evidence-chapter",
    "text-property/evidence-note",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "event-aliases", required: false, many: true, max: null },
    { pagePropertySlug: "evidence-beat", required: true, many: false },
    { pagePropertySlug: "evidence-chapter", required: true, many: false },
    { pagePropertySlug: "evidence-note", required: true, many: false },
    { pagePropertySlug: "event-first-chapter", required: false, many: false },
    { pagePropertySlug: "named-event-kind", required: true, many: false },
    { pagePropertySlug: "event-last-chapter", required: false, many: false },
    { pagePropertySlug: "seq", required: true, many: false },
    { pagePropertySlug: "world-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An event's own words for itself are its aliases.",
    },
    {
      invariantKind: "departure",
      statement: "The story names an event by any alias the event carries.",
    },
    {
      invariantKind: "departure",
      statement: "The chapters an event spans bound every date read against that event.",
    },
    {
      invariantKind: "departure",
      statement: "An event names the world the event happened in.",
    },
  ],
} as const satisfies PageType
