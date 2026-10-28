import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const maidSamaS01e01 = {
  id: "01a183da-f59a-72ae-becc-25635a31c6d6",
  type: "page-type/episode",
  slug: "maid-sama-s01e01",
  description:
    "Student school president Misaki is overly stern due to some tough going in her life. This sparks the interest of exceptional student Usui.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/maid-sama-season-1"],
  position: 1,
  publishedAt: "2010-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1166779",
      externalLink: "https://www.themoviedb.org/tv/65648/season/1/episode/1",
    },
  ],
  title: "Misaki Is a Maid!",
  episodeType: "standard",
  stillPath: "/nedaurGuxr8mVrkRRM0N9ZpnIJr.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:52:07.450Z",
  updatedAt: "2026-10-28T18:52:07.450Z",
} as const satisfies Episode
