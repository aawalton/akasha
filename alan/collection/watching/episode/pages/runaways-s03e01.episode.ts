import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const runawaysS03e01 = {
  id: "01a18851-864b-7192-88ec-c5ff39cd822c",
  type: "page-type/episode",
  slug: "runaways-s03e01",
  description:
    "The Runaways spring a trap to rescue their missing friends from Jonah and his family.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-runaways-season-3"],
  position: 1,
  publishedAt: "2019-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1864519",
      externalLink: "https://www.themoviedb.org/tv/67466/season/3/episode/1",
    },
  ],
  title: "Smoke and Mirrors",
  episodeType: "standard",
  stillPath: "/tBKp3ZoPqfzUDgMA6PwVS3mYR15.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:40:06.602Z",
  updatedAt: "2026-10-29T15:40:06.602Z",
} as const satisfies Episode
