import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e06 = {
  id: "01a1884b-ef6f-79b0-a394-91a9ea9b5f22",
  type: "page-type/episode",
  slug: "ncis-s10e06",
  description:
    "When a Navy Lieutenant who recently returned home from the Middle East is found dead from a brutal attack, the NCIS team questions the victim’s friend, Marine Captain Joe Wescott.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 6,
  publishedAt: "2012-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334675",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/6",
    },
  ],
  title: "Shell Shock (1)",
  episodeType: "standard",
  stillPath: "/r5BZ19aCtw4DbqWmLJnv9VY166O.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
