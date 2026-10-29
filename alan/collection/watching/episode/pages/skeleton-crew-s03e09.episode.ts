import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e09 = {
  id: "01a18852-196b-733e-83f5-730792fbea20",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e09",
  description:
    "To help Anthony get ready for his big night, Veronica, Hunter, Glenn, Appolina, Anglicus, Dennis, and Chaz share their stories of their first time.",
  ownLength: 36,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 9,
  publishedAt: "2018-01-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380498",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/9",
    },
  ],
  title: "Losing It",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
