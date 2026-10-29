import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS01e06 = {
  id: "01a18854-50a7-74cd-8358-c39581ac093e",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s01e06",
  description:
    "R2-D2 is lost during a fierce space battle -- and Anakin must find him before the Separatists discover the Jedi military secrets locked in his memory banks.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-1"],
  position: 6,
  publishedAt: "2008-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286568",
      externalLink: "https://www.themoviedb.org/tv/4194/season/1/episode/6",
    },
  ],
  title: "Downfall of a Droid",
  episodeType: "standard",
  stillPath: "/fFC8Qh6hl4JPgKLsgAMjQBYRFyU.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
