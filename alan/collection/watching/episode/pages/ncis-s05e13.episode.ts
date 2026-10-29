import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e13 = {
  id: "01a1884b-ef68-7f9b-9f07-a1dcb65b6b24",
  type: "page-type/episode",
  slug: "ncis-s05e13",
  description:
    "When a dog owner is found murdered, the NCIS team must determine if his dog committed the murder or not, and Abby decides to fight for the dog's life by trusting her instinct about the dog's innocence.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 13,
  publishedAt: "2008-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334465",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/13",
    },
  ],
  title: "Dog Tags",
  episodeType: "standard",
  stillPath: "/cTW8LoijebnRrRxl835dHxr1pD7.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
