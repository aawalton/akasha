import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e06 = {
  id: "01a18852-196b-7eb3-b808-e48188ac6ab8",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e06",
  description:
    "Hunter and Anthony find themselves working together to host a dinner party for a very special guest, leaving Anglicus and Appolina in charge of the bar.",
  ownLength: 34,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 6,
  publishedAt: "2018-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380495",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/6",
    },
  ],
  title: "Cooked",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
