import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallSuperS01e21 = {
  id: "01a183dc-a494-7e89-838d-050bc53375ce",
  type: "page-type/episode",
  slug: "dragon-ball-super-s01e21",
  description:
    "Frieza's forces begin their raid on Planet Earth. Goku and Vegeta, oblivious to what is happening on Earth, continue their training under Whis.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-super-season-1"],
  position: 21,
  publishedAt: "2015-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1141850",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1/episode/21",
    },
  ],
  title: "The Start of Vengeance! The Frieza Force's Malice Strikes Gohan!",
  episodeType: "standard",
  stillPath: "/wmZnPHze73TQmjccVXwkrf56B3B.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Episode
