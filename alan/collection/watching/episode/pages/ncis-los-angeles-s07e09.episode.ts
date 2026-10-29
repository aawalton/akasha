import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS07e09 = {
  id: "01a1884a-e0ef-75ba-b4b5-cebee7c675c5",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s07e09",
  description:
    "The team searches for a missing teenage girl who is feared to have been recruited by a terrorist organization,",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-7"],
  position: 9,
  publishedAt: "2015-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1134170",
      externalLink: "https://www.themoviedb.org/tv/17610/season/7/episode/9",
    },
  ],
  title: "Defectors",
  episodeType: "standard",
  stillPath: "/srrnUBbbe7jWa82na7zLUfINtmS.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
