import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stargateAtlantisS02e02 = {
  id: "01a18854-82d0-7554-8bc6-3100e48e86b3",
  type: "page-type/episode",
  slug: "stargate-atlantis-s02e02",
  description:
    "The Daedalus is infected by a Wraith computer virus, while members of the expedition hope to return to Earth.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/stargate-atlantis-season-2"],
  position: 2,
  publishedAt: "2005-07-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "168480",
      externalLink: "https://www.themoviedb.org/tv/2290/season/2/episode/2",
    },
  ],
  title: "The Intruder",
  episodeType: "standard",
  stillPath: "/6m6reQko8IJ7jtPsAIRdQPVYWlX.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:43:22.319Z",
  updatedAt: "2026-10-29T15:43:22.319Z",
} as const satisfies Episode
