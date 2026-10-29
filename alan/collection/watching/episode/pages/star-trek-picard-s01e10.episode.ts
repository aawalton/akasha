import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS01e10 = {
  id: "01a18853-07ce-7e14-9ccd-ea35c69f8bdc",
  type: "page-type/episode",
  slug: "star-trek-picard-s01e10",
  description:
    "A final confrontation on the synthetics’ homeworld, Coppelius pits Picard and his team against the Romulans, as well as the synths who seek to safeguard their existence at all costs.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-1"],
  position: 10,
  publishedAt: "2020-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2057386",
      externalLink: "https://www.themoviedb.org/tv/85949/season/1/episode/10",
    },
  ],
  title: "Et in Arcadia Ego (2)",
  episodeType: "finale",
  stillPath: "/8jJhlJ1sTScm5Be8o0Vsx9oftIm.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
