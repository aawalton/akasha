import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const madeInAbyssS02e01 = {
  id: "01a183dd-0708-7507-b951-4d712f0c5bc6",
  type: "page-type/episode",
  slug: "made-in-abyss-s02e01",
  description:
    "An old man speaks of a golden city that lies within a devouring abyss somewhere in uncharted waters. One explorer may be the key to finding both.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/made-in-abyss-season-2"],
  position: 1,
  publishedAt: "2022-07-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3760309",
      externalLink: "https://www.themoviedb.org/tv/72636/season/2/episode/1",
    },
  ],
  title: "The Compass Pointed to the Darkness",
  episodeType: "standard",
  stillPath: "/Tgu6E3aMf7sFHFbEIMEjetnpMi.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-28T18:54:22.982Z",
  updatedAt: "2026-10-28T18:54:22.982Z",
} as const satisfies Episode
