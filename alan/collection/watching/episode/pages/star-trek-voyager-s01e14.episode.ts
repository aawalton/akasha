import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e14 = {
  id: "01a18853-ac8a-79b0-b039-fb472f0e213c",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e14",
  description:
    "Stardate: 48832.1. The inventor of a weapon that slaughtered Neelix’s people contacts Neelix to warn of a fatal disease he may have contracted as a side effect.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 14,
  publishedAt: "1995-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112953",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/14",
    },
  ],
  title: "Jetrel",
  episodeType: "standard",
  stillPath: "/1o3UnylZN2BiVDygCUh4qBb83Qb.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
