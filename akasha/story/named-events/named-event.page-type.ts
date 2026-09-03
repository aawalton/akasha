import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Seq } from "../../alan/tracking/daily/wake-days/properties/seq.number-property.ts"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { Aliases } from "./properties/aliases.text-property.ts"
import type { EvidenceBeat } from "./properties/evidence-beat.number-property.ts"
import type { EvidenceChapter } from "./properties/evidence-chapter.text-property.ts"
import type { EvidenceNote } from "./properties/evidence-note.text-property.ts"
import type { FirstChapter } from "./properties/first-chapter.number-property.ts"
import type { LastChapter } from "./properties/last-chapter.number-property.ts"
import type { NamedEventKind } from "./properties/named-event-kind.select-property.ts"
import type { WorldSlug } from "./properties/world-slug.relation-property.ts"

export type NamedEvent = Page & {
  title: Title
  aliases?: readonly Aliases[]
  evidenceBeat: EvidenceBeat
  evidenceChapter: EvidenceChapter
  evidenceNote: EvidenceNote
  firstChapter?: FirstChapter
  namedEventKind: NamedEventKind
  lastChapter?: LastChapter
  seq: Seq
  worldSlug: WorldSlug
}

export const namedEvent = {
  id: "01a0658b-9f41-7cc1-93d8-f47f7aa3b771",
  pageTypeSlug: "page-type",
  slug: "named-event",
  definition: "something happening once in a story that its people afterwards date other things by",
  pluralSlug: "named-events",
  extendsSlug: "page-type/page",
  partSlugs: [
    "number-property/evidence-beat",
    "number-property/first-chapter",
    "number-property/last-chapter",
    "relation-property/world-slug",
    "select-property/named-event-kind",
    "text-property/aliases",
    "text-property/evidence-chapter",
    "text-property/evidence-note",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "aliases", required: false, many: true, max: null },
    { pagePropertySlug: "evidence-beat", required: true, many: false },
    { pagePropertySlug: "evidence-chapter", required: true, many: false },
    { pagePropertySlug: "evidence-note", required: true, many: false },
    { pagePropertySlug: "first-chapter", required: false, many: false },
    { pagePropertySlug: "named-event-kind", required: true, many: false },
    { pagePropertySlug: "last-chapter", required: false, many: false },
    { pagePropertySlug: "seq", required: true, many: false },
    { pagePropertySlug: "world-slug", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An event's own words for itself are its aliases, and the story uses any of them.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where the chapters an event spans are known, they bound every date read against it.",
    },
    {
      invariantKind: "departure",
      statement: "An event names the world it happened in.",
    },
  ],
} as const satisfies PageType
