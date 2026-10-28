import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const erasedS01e01 = {
  id: "01a183d8-0f20-746e-9029-b6cee52cf06c",
  type: "page-type/episode",
  slug: "erased-s01e01",
  description:
    "Satoru Fujinuma is a struggling manga artist who works at a pizza parlor. Ever since he was a kid, he has been holding himself responsible for a kidnapping incident. Finally, the time has come for the truth from his past to be revealed…",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/erased-season-1"],
  position: 1,
  publishedAt: "2016-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1156715",
      externalLink: "https://www.themoviedb.org/tv/65249/season/1/episode/1",
    },
  ],
  title: "Flashing Before My Eyes",
  episodeType: "standard",
  stillPath: "/y4hrTZ6xxI3rcRlhBzzeGit4h0h.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:48:57.376Z",
  updatedAt: "2026-10-28T18:48:57.376Z",
} as const satisfies Episode
