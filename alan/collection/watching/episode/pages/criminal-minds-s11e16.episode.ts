import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS11e16 = {
  id: "01a18844-d7f5-7c63-827a-cff176c05355",
  type: "page-type/episode",
  slug: "criminal-minds-s11e16",
  description: "When Morgan is abducted, the BAU scrambles to find him and save his life.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-11"],
  position: 16,
  publishedAt: "2016-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1166283",
      externalLink: "https://www.themoviedb.org/tv/4057/season/11/episode/16",
    },
  ],
  title: "Derek",
  episodeType: "standard",
  stillPath: "/odPYrNcDG3iLkss6ZKj9dnK3W0C.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
