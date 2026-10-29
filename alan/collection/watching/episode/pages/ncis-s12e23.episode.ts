import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e23 = {
  id: "01a1884b-ef73-7733-a39d-b9aa2140e8d5",
  type: "page-type/episode",
  slug: "ncis-s12e23",
  description:
    "The NCIS cyber case turns into a united global effort after evidence confirms “The Calling,” an international terrorist group that recruits children through the internet, has been purchasing S-bombs off the black market.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 23,
  publishedAt: "2015-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1055136",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/23",
    },
  ],
  title: "The Lost Boys",
  episodeType: "standard",
  stillPath: "/1TNTmApZT4Pr9FyT5rhKRQittwC.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
