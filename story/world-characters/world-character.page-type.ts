import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { World } from "../stories-played/properties/world.relation-property.ts"
import type { EventCount } from "./properties/event-count.number-property.ts"
import type { FirstChapter } from "./properties/first-chapter.number-property.ts"
import type { LastChapter } from "./properties/last-chapter.number-property.ts"
import type { MaxLevel } from "./properties/max-level.number-property.ts"

export type WorldCharacter = Page & {
  title: Title
  worldSlug: World
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
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "number-property/event-count",
    "number-property/first-chapter",
    "number-property/last-chapter",
    "number-property/max-level",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "relation-property/world", required: true, many: false },
    { pagePropertySlug: "number-property/max-level", required: false, many: false },
    { pagePropertySlug: "number-property/event-count", required: false, many: false },
    { pagePropertySlug: "number-property/first-chapter", required: false, many: false },
    { pagePropertySlug: "number-property/last-chapter", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character belongs to one world.",
    },
    {
      invariantKind: "departure",
      statement:
        "A character is the story's account of that character rather than a player's creation.",
    },
    {
      invariantKind: "departure",
      statement: "The words a character has are the story's rather than akasha's own.",
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
