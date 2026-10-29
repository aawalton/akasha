import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e11 = {
  id: "01a18857-c369-7699-a90d-8722ae4891ae",
  type: "page-type/episode",
  slug: "the-office-s05e11",
  description:
    "The office is on eggshells because Andy still hasn't found out about fiancee Angela's affair with Dwight. When Michael spills the beans, Dwight and Andy take matters into their own hands. Meanwhile, Michael is nervous about being called down to corporate for a meeting with Wallace.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 11,
  publishedAt: "2009-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170209",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/11",
    },
  ],
  title: "The Duel",
  episodeType: "standard",
  stillPath: "/7Mfu31Ah9fyxLYLajdra9Pl4kKX.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
