import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS02e04 = {
  id: "01a1884a-e0e9-7e2d-b749-3369e7cbde99",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s02e04",
  description:
    "The team investigates the murder of a Marine who had top-level security clearance, and the corpse is missing a hand.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-2"],
  position: 4,
  publishedAt: "2010-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557298",
      externalLink: "https://www.themoviedb.org/tv/17610/season/2/episode/4",
    },
  ],
  title: "Special Delivery",
  episodeType: "standard",
  stillPath: "/eIkMewLO9YneEVJpdeSNspqIr8N.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
