import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e13 = {
  id: "01a18852-a9f5-782b-a821-9a446bced56b",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e13",
  description:
    "Lorca plans to move forward with a coup against the Emperor, propelling Burnham to make a quick decision to save not only herself, but the U.S.S. Discovery.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 13,
  publishedAt: "2018-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1421215",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/13",
    },
  ],
  title: "What's Past is Prologue",
  episodeType: "standard",
  stillPath: "/zUrMldisIBxHjbHzAIPmZBwwYZO.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
