import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS01e01 = {
  id: "01a183da-4478-7d43-9b4e-e9e54072ed2b",
  type: "page-type/episode",
  slug: "k-on-s01e01",
  description:
    "Just starting high school, Yui is having trouble fitting in and decides to join the light music club. But she first must buy and learn guitar.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-1"],
  position: 1,
  publishedAt: "2009-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879075",
      externalLink: "https://www.themoviedb.org/tv/42253/season/1/episode/1",
    },
  ],
  title: "Disband the Club!",
  episodeType: "standard",
  stillPath: "/kC4aJQF5MdnOepF40k2HrvzhJca.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
