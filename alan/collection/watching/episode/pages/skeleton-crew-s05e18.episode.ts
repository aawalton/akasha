import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS05e18 = {
  id: "01a18852-196d-7eb6-bf78-a96b7c22a677",
  type: "page-type/episode",
  slug: "skeleton-crew-s05e18",
  description:
    "In the Season Five Finale of Skeleton Crew, hearts are joined, hearts are broken, and goodbyes are made all too real.",
  ownLength: 31,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-5"],
  position: 18,
  publishedAt: "2022-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4457907",
      externalLink: "https://www.themoviedb.org/tv/225011/season/5/episode/18",
    },
  ],
  title: "Ménage à Wha-?, Part 2",
  episodeType: "finale",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
