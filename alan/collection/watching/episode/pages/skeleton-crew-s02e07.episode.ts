import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS02e07 = {
  id: "01a18852-196a-72e5-923c-905f96156569",
  type: "page-type/episode",
  slug: "skeleton-crew-s02e07",
  description:
    "Polly, Anthony, Hunter, and Horatio all decide to go after what they want, leading to some harsh truths for everyone involved.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-2"],
  position: 7,
  publishedAt: "2016-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380464",
      externalLink: "https://www.themoviedb.org/tv/225011/season/2/episode/7",
    },
  ],
  title: "No Bones About It",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
