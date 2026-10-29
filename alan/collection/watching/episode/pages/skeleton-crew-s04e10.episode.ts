import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e10 = {
  id: "01a18852-196c-7341-8c2e-4ed70950f334",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e10",
  description:
    "In Part One of the Season Four Finale, Veronica makes a major announcement that will change her life forever.",
  ownLength: 34,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 10,
  publishedAt: "2019-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380517",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/10",
    },
  ],
  title: "Daffodils, Part 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
