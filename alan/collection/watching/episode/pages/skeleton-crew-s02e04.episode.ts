import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS02e04 = {
  id: "01a18852-196a-7b95-aba1-2f00ce0371e8",
  type: "page-type/episode",
  slug: "skeleton-crew-s02e04",
  description:
    "Anthony awakens to a brand new day, while Hunter struggles with what he learned the night before. Veronica prepares for a will reading, and Appolina seizes life (and Kasimir). Anglicus seeks out a good Samaritan.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-2"],
  position: 4,
  publishedAt: "2016-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380461",
      externalLink: "https://www.themoviedb.org/tv/225011/season/2/episode/4",
    },
  ],
  title: "Broken Bones",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
