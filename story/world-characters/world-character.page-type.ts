import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/pages/properties/title.text-property.ts"
import type { WorldSlug } from "../stories-played/properties/world-slug.relation-property.ts"
import type { EventCount } from "./properties/event-count.number-property.ts"
import type { FirstChapter } from "./properties/first-chapter.number-property.ts"
import type { LastChapter } from "./properties/last-chapter.number-property.ts"
import type { MaxLevel } from "./properties/max-level.number-property.ts"

export type WorldCharacter = Page & {
  title: Title
  worldSlug: WorldSlug
  maxLevel?: MaxLevel
  eventCount?: EventCount
  firstChapter?: FirstChapter
  lastChapter?: LastChapter
}

export const worldCharacter = {
  id: "01a0657a-9ccd-7153-9c9f-c9454abc1a22",
  pageTypeSlug: "page-type",
  slug: "world-character",
  definition: "somebody a world's story follows",
  pluralSlug: "world-characters",
  extendsSlug: "page-type/page",
  runsTabooCheck: false,
  partSlugs: [
    "number-property/event-count",
    "number-property/first-chapter",
    "number-property/last-chapter",
    "number-property/max-level",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "world-slug", required: true, many: false },
    { pagePropertySlug: "max-level", required: false, many: false },
    { pagePropertySlug: "event-count", required: false, many: false },
    { pagePropertySlug: "first-chapter", required: false, many: false },
    { pagePropertySlug: "last-chapter", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character belongs to one world.",
    },
    {
      invariantKind: "departure",
      statement: "A character is what the story says they are rather than what a player made.",
    },
    {
      invariantKind: "departure",
      statement: "The words a character carries are the story's rather than akasha's own.",
    },
    {
      invariantKind: "departure",
      statement: "A world's character readings name the characters of that world.",
    },
    {
      invariantKind: "gap",
      statement: "Every level a story gives a character is beside that character.",
    },
  ],
} as const satisfies PageType
