import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS02e01 = {
  id: "01a18853-07ce-7678-99af-323507d2b18f",
  type: "page-type/episode",
  slug: "star-trek-picard-s02e01",
  description:
    "Starfleet must once again call on legendary Jean-Luc Picard after members of his former crew – Cristóbal Rios, Seven of Nine, Raffi Musiker, and Dr. Agnes Jurati – discover an anomaly in space that threatens the galaxy.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-2"],
  position: 1,
  publishedAt: "2022-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3456115",
      externalLink: "https://www.themoviedb.org/tv/85949/season/2/episode/1",
    },
  ],
  title: "The Star Gazer",
  episodeType: "standard",
  stillPath: "/5cYyAtHU2b8Q1sFBHmrShq2Kt7r.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
