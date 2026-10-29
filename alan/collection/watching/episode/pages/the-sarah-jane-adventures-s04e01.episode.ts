import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS04e01 = {
  id: "01a18858-1d5d-7e8c-a248-6cbebbf1378a",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s04e01",
  description:
    "When Luke has his first nightmare, he's haunted by a dark figure from his dreams. A strange entity is reaching out to our world, with terrible consequences for the whole human race. Luke faces life-changing events, and Bannerman Road will never be the same again.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-4"],
  position: 1,
  publishedAt: "2010-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12029",
      externalLink: "https://www.themoviedb.org/tv/203/season/4/episode/1",
    },
  ],
  title: "The Nightmare Man (1)",
  episodeType: "standard",
  stillPath: "/bQaadLBDweJhQeodkJxd7QspzLm.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
