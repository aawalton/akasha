import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const maidSamaS01e09 = {
  id: "01a183da-f59a-7b78-be2f-b8b0e9d1b1d7",
  type: "page-type/episode",
  slug: "maid-sama-s01e09",
  description:
    "Takumi narrates a strange retelling of Momotar with Misaki as the titular character herself.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/maid-sama-season-1"],
  position: 9,
  publishedAt: "2010-05-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1166787",
      externalLink: "https://www.themoviedb.org/tv/65648/season/1/episode/9",
    },
  ],
  title: "Maid-Sama Does Momotaro",
  episodeType: "standard",
  stillPath: "/ctFyAKp1t5KtMuC01v5Qhb9BGAw.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:52:07.450Z",
  updatedAt: "2026-10-28T18:52:07.450Z",
} as const satisfies Episode
