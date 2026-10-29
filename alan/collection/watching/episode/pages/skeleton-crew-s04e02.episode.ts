import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e02 = {
  id: "01a18852-196b-7407-b45b-ad89bcd556c8",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e02",
  description:
    "Veronica hosts a Zodiac-themed party, but her purpose is not to entertain her guests. Meanwhile, Hunter faces increasing stress from both internal and external sources.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 2,
  publishedAt: "2018-12-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380503",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/2",
    },
  ],
  title: "Phoenix Down",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
