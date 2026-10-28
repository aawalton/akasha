import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e119 = {
  id: "01a183d1-bb53-7d65-9635-f8caca088aed",
  type: "page-type/episode",
  slug: "naruto-s03e119",
  description:
    "Naruto, Kiba and Shikamaru intercept Sasuke from the Sound Ninja Four, but little do they know that another ninja from the Sound Village has been dispatched to grab Sasuke as well.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 119,
  publishedAt: "2005-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908096",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/119",
    },
  ],
  title: "Miscalculation: A New Enemy Appears!",
  episodeType: "standard",
  stillPath: "/5jmFFx0jNDuPwDMaPISgOGginVv.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
