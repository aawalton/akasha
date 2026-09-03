import type { PageType } from "@akasha/pages-system/page-type"
import type { StoryChapterRead } from "../story-chapters-read/story-chapter-read.page-type.ts"
import type { MarkedReadAt } from "./properties/marked-read-at.instant-property.ts"

export type StoryChapterRoyalRoad = StoryChapterRead & {
  markedReadAt?: MarkedReadAt
}

export const storyChapterRoyalRoad = {
  id: "01a0659c-387a-7f1a-94b0-dca83e7340d5",
  pageTypeSlug: "page-type",
  slug: "story-chapter-royal-road",
  definition: "a chapter of a story published on Royal Road",
  pluralSlug: "story-chapters-royal-road",
  extendsSlug: "page-type/story-chapter-read",
  runsTabooCheck: false,
  partSlugs: ["instant-property/marked-read-at"],
  properties: [{ pagePropertySlug: "marked-read-at", required: false, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter is part of the one story the chapter was published in.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter's slug opens with the story the chapter is part of.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter whose slug would open with a digit carries its source in front as well.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter announcing a book rather than telling one is a chapter all the same.",
    },
    {
      invariantKind: "departure",
      statement: "The source a chapter came from is Royal Road.",
    },
  ],
} as const satisfies PageType
