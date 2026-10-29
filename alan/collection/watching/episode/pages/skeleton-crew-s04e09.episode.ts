import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e09 = {
  id: "01a18852-196b-7cc3-9db7-191a52a5bc83",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e09",
  description:
    "Chaz's graduation sets the stage for many of our characters moving on from the comfortably familiar.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 9,
  publishedAt: "2019-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380513",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/9",
    },
  ],
  title: "Pomp and Circumstance",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
