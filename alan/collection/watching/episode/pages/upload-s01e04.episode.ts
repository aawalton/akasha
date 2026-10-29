import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS01e04 = {
  id: "01a18859-6797-72cb-ade6-811f31ae2757",
  type: "page-type/episode",
  slug: "upload-s01e04",
  description:
    "Nora thinks she may have misjudged Nathan. Nathan and his girlfriend Ingrid are interviewed about the challenges of romance between a living person and an Upload.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-1"],
  position: 4,
  publishedAt: "2020-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2249645",
      externalLink: "https://www.themoviedb.org/tv/86248/season/1/episode/4",
    },
  ],
  title: "The Sex Suit",
  episodeType: "standard",
  stillPath: "/d9b0eNgLFrU3cOTFUbXOWTLn3Kp.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
