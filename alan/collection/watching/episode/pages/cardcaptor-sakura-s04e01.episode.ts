import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cardcaptorSakuraS04e01 = {
  id: "01a183db-217b-7951-a575-f48cb5abbdae",
  type: "page-type/episode",
  slug: "cardcaptor-sakura-s04e01",
  description:
    "It's April, the cherry trees are in full bloom, and Sakura has entered Tomoeda Middle School. She's reunited with Syaoran, who has returned from Hong Kong, and her new student life has begun.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/cardcaptor-sakura-season-4"],
  position: 1,
  publishedAt: "2018-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1416448",
      externalLink: "https://www.themoviedb.org/tv/35790/season/4/episode/1",
    },
  ],
  title: "Sakura and the Clear Cards",
  episodeType: "standard",
  stillPath: "/qt2JwzcIguV0HA1eCsFACEnrOhp.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:52:18.678Z",
  updatedAt: "2026-10-28T18:52:18.678Z",
} as const satisfies Episode
