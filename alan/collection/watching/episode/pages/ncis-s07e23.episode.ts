import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e23 = {
  id: "01a1884b-ef6c-74f3-becf-ba4ad2bef84b",
  type: "page-type/episode",
  slug: "ncis-s07e23",
  description:
    "When a colleague's murder sends shockwaves through the team, Gibbs uncovers a surprising link to the crime.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 23,
  publishedAt: "2010-05-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334561",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/23",
    },
  ],
  title: "Patriot Down",
  episodeType: "standard",
  stillPath: "/xpZHtMYvau4lyNhaxmgHItiM3RI.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
