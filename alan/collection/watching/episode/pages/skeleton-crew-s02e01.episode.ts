import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS02e01 = {
  id: "01a18852-196a-707e-9625-d1dd2842cebc",
  type: "page-type/episode",
  slug: "skeleton-crew-s02e01",
  description:
    "With a year gone by, Hunter, Anthony, Veronica, and their friends find themselves at another Halloween party. True to form, surprises await them all.",
  ownLength: 35,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-2"],
  position: 1,
  publishedAt: "2016-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380458",
      externalLink: "https://www.themoviedb.org/tv/225011/season/2/episode/1",
    },
  ],
  title: "Setting Bones",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
