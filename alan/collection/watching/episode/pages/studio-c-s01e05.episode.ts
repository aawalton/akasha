import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS01e05 = {
  id: "01a18885-00f8-7b65-ab28-b5a69ec865a0",
  type: "page-type/episode",
  slug: "studio-c-s01e05",
  description:
    "The group plays their first gig, Matt works on his New Year's resolution, and Jason learns how to play mafia.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-1"],
  position: 5,
  publishedAt: "2012-11-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1378620",
      externalLink: "https://www.themoviedb.org/tv/68207/season/1/episode/5",
    },
  ],
  title: "Season 1 Episode 5",
  episodeType: "standard",
  stillPath: "/mKMxSm7EsJUPXnuE5xHHD1kvCYU.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
