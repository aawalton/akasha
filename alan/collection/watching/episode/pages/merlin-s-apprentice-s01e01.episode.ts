import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const merlinSApprenticeS01e01 = {
  id: "01a1884a-596d-7d2f-87d7-81c53c5fd8a5",
  type: "page-type/episode",
  slug: "merlin-s-apprentice-s01e01",
  description:
    "The sorcerer Merlin and his young apprentice must find the Holy Grail and restore Camelot to its glory.",
  ownLength: 91,
  ownProgress: 0,
  partOfCollections: ["season/merlin-s-apprentice-season-1"],
  position: 1,
  publishedAt: "2006-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "622004",
      externalLink: "https://www.themoviedb.org/tv/23295/season/1/episode/1",
    },
  ],
  title: "Part 1",
  episodeType: "standard",
  stillPath: "/qKR6wocywV4Sc29WNl4urtAWhUC.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:32:16.365Z",
  updatedAt: "2026-10-29T15:32:16.365Z",
} as const satisfies Episode
