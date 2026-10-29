import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e14 = {
  id: "01a1887f-e186-7ff1-8766-858c9bd982e5",
  type: "page-type/episode",
  slug: "star-trek-2-s01e14",
  description:
    "Despite the earlier Romulan war, the Romulans have never been seen in person. The Enterprise, in pursuit of a Romulan aggressor, makes a discovery that causes suspicion about a senior crew member.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 14,
  publishedAt: "1966-12-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13965",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/14",
    },
  ],
  title: "Balance of Terror",
  episodeType: "standard",
  stillPath: "/63UGULEQBDHzdNvGzl3wA8FBSL9.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
