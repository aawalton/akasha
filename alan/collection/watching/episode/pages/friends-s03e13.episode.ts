import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e13 = {
  id: "01a18848-c2bc-7b74-8416-ad9d7bebf935",
  type: "page-type/episode",
  slug: "friends-s03e13",
  description:
    "Monica's willpower is tested when she runs into Richard at the video store. Rachel agrees to read The Shining if Joey reads Little Women. Phoebe's athletic date has a problem with short shorts.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 13,
  publishedAt: "1997-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86353",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/13",
    },
  ],
  title: "The One Where Monica and Richard Are Just Friends",
  episodeType: "standard",
  stillPath: "/qIbd5XEEa5gK2oXRbIeYT9PrK2W.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
