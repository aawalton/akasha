import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e03 = {
  id: "01a18857-c369-7ed4-8728-b62b109c7da2",
  type: "page-type/episode",
  slug: "the-office-s05e03",
  description:
    "Michael practices for the birth of Jan's baby by having Dwight go over possible birthing scenarios. Meanwhile, Michael tells Holly that he will pretend to dislike her for Jan's benefit.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 3,
  publishedAt: "2008-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170230",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/3",
    },
  ],
  title: "Baby Shower",
  episodeType: "standard",
  stillPath: "/bLMHG7d3LBdFqPuUYFrYa3CaNZE.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
