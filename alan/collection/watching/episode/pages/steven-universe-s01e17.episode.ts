import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e17 = {
  id: "01a18855-67e5-7152-8f4f-c7d044e773d6",
  type: "page-type/episode",
  slug: "steven-universe-s01e17",
  description: "Steven and Connie try to ride Lion to the movie theater, but Lion has other plans.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 17,
  publishedAt: "2014-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003610",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/17",
    },
  ],
  title: "Lion 2: The Movie",
  episodeType: "standard",
  stillPath: "/6PmyIdDABBYR0li8fwfozH5Dhxy.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
