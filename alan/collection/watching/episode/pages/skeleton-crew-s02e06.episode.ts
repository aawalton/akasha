import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS02e06 = {
  id: "01a18852-196a-7272-9c55-e3c00ef91ea5",
  type: "page-type/episode",
  slug: "skeleton-crew-s02e06",
  description:
    "The gang gathers at Anthony's for a Thanksgiving dinner which leaves a lot to be desired, so Glenn decides to distract everyone with a tale from his youth.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-2"],
  position: 6,
  publishedAt: "2016-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380463",
      externalLink: "https://www.themoviedb.org/tv/225011/season/2/episode/6",
    },
  ],
  title: "Wishbones",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
