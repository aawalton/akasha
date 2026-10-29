import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS05e01 = {
  id: "01a1884b-301b-71c5-ab9a-ab77c444b653",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s05e01",
  description:
    "While Pride fights for his life in the ICU, the team scours the city for the hit woman who attempted to assassinate him.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-5"],
  position: 1,
  publishedAt: "2018-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1556979",
      externalLink: "https://www.themoviedb.org/tv/61387/season/5/episode/1",
    },
  ],
  title: "See You Soon",
  episodeType: "standard",
  stillPath: "/bkla6h5HrVZOt8jFWPxtbCPMR4S.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
