import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e06 = {
  id: "01a18853-ac90-7620-b26c-f6e9b3bec24c",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e06",
  description:
    "Stardate: Unknown. A mysterious alien attack leaves Tuvok's brain damaged and his personality altered, leaving Neelix to try to rehabilitate him.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 6,
  publishedAt: "1999-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113302",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/6",
    },
  ],
  title: "Riddles",
  episodeType: "standard",
  stillPath: "/u931xocRQtiXxv7Ry3ApsUmNfmG.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
