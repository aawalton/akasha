import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const attackOnTitanS02e02 = {
  id: "01a183d1-6a23-7bf1-83a2-83ebabd7863c",
  type: "page-type/episode",
  slug: "attack-on-titan-s02e02",
  description:
    "With the appearance of Titans within Wall Rose, Sasha and Connie ride as messengers to warn their villages of the impending threat.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/attack-on-titan-season-2"],
  position: 2,
  publishedAt: "2017-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1299003",
      externalLink: "https://www.themoviedb.org/tv/1429/season/2/episode/2",
    },
  ],
  title: "I'm Home",
  episodeType: "standard",
  stillPath: "/cVtiOuKZbAOmPhJOipNokPae4cc.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:41:41.918Z",
  updatedAt: "2026-10-28T18:41:41.918Z",
} as const satisfies Episode
