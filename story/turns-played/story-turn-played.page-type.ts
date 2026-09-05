import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../collection-system/collections/collection.page-type.ts"
import type { OwnLength } from "../../collection-system/collections/properties/own-length.number-property.ts"
import type { Prose } from "../stories-played/properties/prose.file-property.ts"

export type StoryTurnPlayed = Collection & {
  ownLength?: OwnLength
  prose: Prose
}

export const storyTurnPlayed = {
  id: "01a064bc-8477-7bac-98ec-152da07077ce",
  pageTypeSlug: "page-type",
  slug: "story-turn-played",
  definition: "one exchange of a story nobody wrote",
  pluralSlug: "story-turns-played",
  extendsSlug: ["page-type/collection"],
  runsTabooCheck: false,
  properties: [
    { pagePropertySlug: "own-length", required: false, many: false },
    { pagePropertySlug: "prose", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A turn carries the prose one exchange of play made.",
    },
    {
      invariantKind: "departure",
      statement: "A turn is part of the one story the turn was played in.",
    },
    {
      invariantKind: "departure",
      statement: "A turn's slug opens with the story the turn is part of.",
    },
    {
      invariantKind: "gap",
      statement: "A turn's text is kept here alone rather than also in a game's rows.",
    },
  ],
} as const satisfies PageType
