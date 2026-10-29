import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS08e11 = {
  id: "01a1884a-e0f1-7c2a-bc30-1e5835302cee",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s08e11",
  description:
    "The team goes on the chase for a Navy analyst being held hostage, only to discover things aren't as simple as they seem.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-8"],
  position: 11,
  publishedAt: "2016-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1245142",
      externalLink: "https://www.themoviedb.org/tv/17610/season/8/episode/11",
    },
  ],
  title: "Tidings We Bring",
  episodeType: "standard",
  stillPath: "/lq5q4sSaOztAdKJ6e5UcJUJmvow.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
