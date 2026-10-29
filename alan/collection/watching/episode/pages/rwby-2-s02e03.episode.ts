import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const rwby2S02e03 = {
  id: "01a18884-8768-757f-8a9c-54341d769789",
  type: "page-type/episode",
  slug: "rwby-2-s02e03",
  description:
    "Team RWBY start their investigation of the White Fang and Ruby learns a little bit more about their strange friend, Penny.",
  ownLength: 12,
  ownProgress: 12,
  partOfCollections: ["season/rwby-volume-2"],
  position: 3,
  publishedAt: "2014-08-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1004262",
      externalLink: "https://www.themoviedb.org/tv/50137/season/2/episode/3",
    },
  ],
  title: "A Minor Hiccup",
  episodeType: "standard",
  stillPath: "/2BXDmqrcdgXCCPlKr3lK6XqbPuN.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:35:49.223Z",
  updatedAt: "2026-10-29T16:35:49.223Z",
} as const satisfies Episode
