import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS09e07 = {
  id: "01a1884a-e0f2-7664-87c3-ced65cf51c13",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s09e07",
  description:
    "Kensi is transported to a missile launch facility to help thwart a takeover of nuclear weapons.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-9"],
  position: 7,
  publishedAt: "2017-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1392500",
      externalLink: "https://www.themoviedb.org/tv/17610/season/9/episode/7",
    },
  ],
  title: "The Silo",
  episodeType: "standard",
  stillPath: "/eQMa3q3ImR2Wq6FYaAn4lCqMjlJ.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
