import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS07e03 = {
  id: "01a18849-352a-79ef-8f60-2b48d7040e06",
  type: "page-type/episode",
  slug: "good-witch-s07e03",
  description:
    "Cassie, Stephanie and Abigail help Martha throw Claire a baby shower, sparking memories of Cassie's own baby shower.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-7"],
  position: 3,
  publishedAt: "2021-05-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2960246",
      externalLink: "https://www.themoviedb.org/tv/61864/season/7/episode/3",
    },
  ],
  title: "The Delivery",
  episodeType: "standard",
  stillPath: "/wkq0o4Y5xARTd17zKXqZ6q116jK.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
