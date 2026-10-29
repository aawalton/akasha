import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e05 = {
  id: "01a18852-196b-71ab-9244-7748f5f70f78",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e05",
  description:
    "The hurricane has arrived, but it's inside where the storm rages for Hunter, Anthony, Appolina, and Veronica.",
  ownLength: 38,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 5,
  publishedAt: "2017-12-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380482",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/5",
    },
  ],
  title: "The Perfect Storm",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
