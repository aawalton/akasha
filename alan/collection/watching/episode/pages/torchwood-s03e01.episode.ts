import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS03e01 = {
  id: "01a18859-3c6a-7ffa-80dc-a1e85ca7d805",
  type: "page-type/episode",
  slug: "torchwood-s03e01",
  description:
    'At 8.45am, every child in the world suddenly stops, chanting the words "we are coming" again and again. Whilst investigating, the remaining Torchwood team face greater personal and professional challenges than ever before, having to work with their numbers depleted.',
  ownLength: 58,
  ownProgress: 0,
  partOfCollections: ["season/children-of-earth"],
  position: 1,
  publishedAt: "2009-07-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21593",
      externalLink: "https://www.themoviedb.org/tv/424/season/3/episode/1",
    },
  ],
  title: "Day One",
  episodeType: "standard",
  stillPath: "/webociroFqPxslNVCTsBprbKEyS.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
