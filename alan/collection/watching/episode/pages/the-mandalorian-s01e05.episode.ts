import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS01e05 = {
  id: "01a18885-1cd0-7761-8d30-6e8cb1a05438",
  type: "page-type/episode",
  slug: "the-mandalorian-s01e05",
  description: "The Mandalorian helps a rookie bounty hunter who is in over his head.",
  ownLength: 37,
  ownProgress: 37,
  partOfCollections: ["season/the-mandalorian-season-1"],
  position: 5,
  publishedAt: "2019-12-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1987335",
      externalLink: "https://www.themoviedb.org/tv/82856/season/1/episode/5",
    },
  ],
  title: "Chapter 5: The Gunslinger",
  episodeType: "standard",
  stillPath: "/bAuXxIGaRPtXmO1qlm7B99PPlCV.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:36:27.471Z",
  updatedAt: "2026-10-29T16:36:27.471Z",
} as const satisfies Episode
