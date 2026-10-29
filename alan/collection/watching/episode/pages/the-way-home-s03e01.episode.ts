import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theWayHomeS03e01 = {
  id: "01a18858-c550-76a1-8b89-8a2d926f570e",
  type: "page-type/episode",
  slug: "the-way-home-s03e01",
  description:
    "New mysteries unfold across generations, as the Landry family looks to their past to find the truth.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-way-home-season-3"],
  position: 1,
  publishedAt: "2025-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5788266",
      externalLink: "https://www.themoviedb.org/tv/201836/season/3/episode/1",
    },
  ],
  title: "You Ain't Seen Nothing Yet",
  episodeType: "standard",
  stillPath: "/c9JhhOotxfU34A2qPwbc4pBwSlS.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:48:01.487Z",
  updatedAt: "2026-10-29T15:48:01.487Z",
} as const satisfies Episode
