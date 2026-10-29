import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS02e16 = {
  id: "01a1887f-56d4-784a-b072-a81d45d1ec4a",
  type: "page-type/episode",
  slug: "scorpion-s02e16",
  description:
    "After a powerful earthquake rocks Los Angeles, Team Scorpion must fix a pinched gas line to prevent a massive explosion.",
  ownLength: 39,
  ownProgress: 39,
  partOfCollections: ["season/scorpion-season-2"],
  position: 16,
  publishedAt: "2016-02-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1162965",
      externalLink: "https://www.themoviedb.org/tv/60797/season/2/episode/16",
    },
  ],
  title: "Fractured",
  episodeType: "standard",
  stillPath: "/a2lsa2JgX9Ga0jeE7KkVyd0Rokg.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
