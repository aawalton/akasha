import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e16 = {
  id: "01a1887f-e189-70a2-ba21-c1d65da3b718",
  type: "page-type/episode",
  slug: "star-trek-2-s02e16",
  description:
    "Captain Kirk and his companions are abducted into slavery and trained to fight as gladiators for the gambling entertainment of three disembodied beings.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 16,
  publishedAt: "1968-01-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14001",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/16",
    },
  ],
  title: "The Gamesters of Triskelion",
  episodeType: "standard",
  stillPath: "/1fZRn4zpPjv5pPiWdDAKD1x5DQy.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
