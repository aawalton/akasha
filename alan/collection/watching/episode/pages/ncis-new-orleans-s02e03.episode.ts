import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e03 = {
  id: "01a1884b-3016-72da-bb58-76873ecb2a6f",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e03",
  description:
    "When a female combat pilot and Navy hero dies in an air-show plane crash, the NCIS team must investigate if it’s the fault of the pilot or the new jet that was just approved to deploy to bases globally.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 3,
  publishedAt: "2015-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1109437",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/3",
    },
  ],
  title: "Touched by the Sun",
  episodeType: "standard",
  stillPath: "/baH1B33xRnRSKDiWHRRnEmoRXuq.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
