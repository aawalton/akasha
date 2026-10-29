import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e10 = {
  id: "01a18853-1b88-709e-b570-3a3537f542e9",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e10",
  description:
    "When the plan goes awry, the crew must improvise. Meanwhile, Gwyn discovers a dark truth that will forever jeopardize their quest toward salvation.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 10,
  publishedAt: "2022-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3448053",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/10",
    },
  ],
  title: "A Moral Star (2)",
  episodeType: "mid-season",
  stillPath: "/vyxhxX8FEiwPI8judxd9pig8dwj.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
