import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e01 = {
  id: "01a18852-196b-71d8-bc7b-70ca964a3eeb",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e01",
  description:
    "It's time for another Halloween party at MoneyShot$, but with all that happened last year, Hunter, Anthony, Anglicus, and Appolina find themselves in very different places emotionally, and, in some cases, physically.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 1,
  publishedAt: "2018-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380502",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/1",
    },
  ],
  title: "Sacrifice",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
