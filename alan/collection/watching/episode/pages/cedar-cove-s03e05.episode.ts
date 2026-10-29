import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cedarCoveS03e05 = {
  id: "01a18844-02b6-743e-b56f-b02e807a213f",
  type: "page-type/episode",
  slug: "cedar-cove-s03e05",
  description:
    "Paul tries to play peacemaker between Olivia and Will, who have escalated their family feud and are prepared to battle one another in court.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/cedar-cove-season-3"],
  position: 5,
  publishedAt: "2015-08-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1092854",
      externalLink: "https://www.themoviedb.org/tv/47320/season/3/episode/5",
    },
  ],
  title: "Civil War",
  episodeType: "standard",
  stillPath: "/3aTVK59YcA18237hPBHitHojZGy.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:25:20.948Z",
  updatedAt: "2026-10-29T15:25:20.948Z",
} as const satisfies Episode
