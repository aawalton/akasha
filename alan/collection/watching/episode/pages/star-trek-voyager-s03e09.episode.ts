import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e09 = {
  id: "01a18853-ac8c-773f-b43b-33afaf9eac38",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e09",
  description:
    "Stardate: 50312.5. While trying to rescue Paris and Tuvok, Torres and Chakotay are captured by a gang of weapons smugglers who believe that they are from the government.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 9,
  publishedAt: "1996-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113158",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/9",
    },
  ],
  title: "Future's End (2)",
  episodeType: "standard",
  stillPath: "/gt4ilcKcrTD9YyWIXMEjxPdF196.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
