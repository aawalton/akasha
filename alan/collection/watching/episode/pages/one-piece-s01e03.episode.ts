import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e03 = {
  id: "01a18884-52e4-7292-8826-846c1c3aac35",
  type: "page-type/episode",
  slug: "one-piece-s01e03",
  description:
    "Luffy convinces Zoro to join his crew, but they must first defeat Captain Morgan. After freeing the island from Morgan's oppressive rule, Coby is accepted as a marine while the other two continue on their journey.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 3,
  publishedAt: "1999-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "852686",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/3",
    },
  ],
  title: "Morgan VS Luffy! Who's This Beautiful Young Girl?",
  episodeType: "standard",
  stillPath: "/x1sa7mhf3J7514uGnnGczYydCL0.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
