import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e01 = {
  id: "01a18848-c2bb-7eb8-92e2-adbe6a890d67",
  type: "page-type/episode",
  slug: "friends-s03e01",
  description:
    'Ross reveals a fantasy to Rachel involving a certain "Star Wars" character. Monica suffers from insomnia after her breakup with Richard. And Chandler, back together with Janice, wants Joey to bond with her.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 1,
  publishedAt: "1996-09-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86272",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/1",
    },
  ],
  title: "The One with the Princess Leia Fantasy",
  episodeType: "standard",
  stillPath: "/jLdNm73Hf2ZEpzwhj0q43MeHhEt.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
