import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e22 = {
  id: "01a1884a-e0ef-7b08-a464-01d127e23fbc",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e22",
  description:
    "The team attempt to find an expert sniper after they learn about his connection to an extremist group.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 22,
  publishedAt: "2015-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1056491",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/22",
    },
  ],
  title: "Field of Fire",
  episodeType: "standard",
  stillPath: "/apzbPZeBvvNevDgDu2oCcaHngD0.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
