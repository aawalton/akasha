import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Seq } from "../../alan/track/days/properties/seq.number-property.ts"
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
  aliases?: readonly EventAliases[]
  evidenceBeat: EvidenceBeat
  evidenceChapter: EvidenceChapter
  evidenceNote: EvidenceNote
  firstChapter?: EventFirstChapter
  namedEventKind: NamedEventKind
  lastChapter?: EventLastChapter
  seq: Seq
  world?: World
}

export const namedEvent = {
  id: "01a0658b-9f41-7cc1-93d8-f47f7aa3b771",
  pageTypeSlug: "page-type",
  slug: "named-event",
  definition: "something happening once in a story that its people afterwards date other things by",
  pluralSlug: "named-events",
  extends: ["page-type/page"],
  parts: [
    "number-property/evidence-beat",
    "number-property/event-first-chapter",
    "number-property/event-last-chapter",
    "select-property/named-event-kind",
    "text-property/event-aliases",
    "text-property/evidence-chapter",
    "text-property/evidence-note",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "text-property/event-aliases",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/evidence-beat", required: true, many: false },
    { pageProperty: "text-property/evidence-chapter", required: true, many: false },
    { pageProperty: "text-property/evidence-note", required: true, many: false },
    { pageProperty: "number-property/event-first-chapter", required: false, many: false },
    { pageProperty: "select-property/named-event-kind", required: true, many: false },
    { pageProperty: "number-property/event-last-chapter", required: false, many: false },
    { pageProperty: "number-property/seq", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An event's own words for itself are its aliases.",
    },
    {
      invariantKind: "departure",
      statement: "The story names an event by any alias the event has.",
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
