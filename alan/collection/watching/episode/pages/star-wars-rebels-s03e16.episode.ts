import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e16 = {
  id: "01a18853-ddfe-79e4-bf57-281fe1db08cd",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e16",
  description:
    "Fearing that the identity of a rebel spy will soon be discovered by the Empire, the Rebels launch a plan to rescue him before he is caught.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 16,
  publishedAt: "2017-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1263034",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/16",
    },
  ],
  title: "Through Imperial Eyes",
  episodeType: "standard",
  stillPath: "/ipsjnYI0ooKPDI6ztOpg5vT50HI.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
