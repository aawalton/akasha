import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e27 = {
  id: "01a183d1-bb4c-79ad-861d-7aa1d7ff2c9a",
  type: "page-type/episode",
  slug: "naruto-s01e27",
  description:
    "The second exam is about to begin, and every ninja must sign a form so that their team can get either the Heaven or Earth Scroll. The goal is to get one of each scroll and make it to the tower in five days.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 27,
  publishedAt: "2003-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908152",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/27",
    },
  ],
  title: "The Chunin Exam Stage 2: The Forest of Death",
  episodeType: "standard",
  stillPath: "/e0GGbezmLS5SVYTgAHQEnB2pfXE.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
