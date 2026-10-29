import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e13 = {
  id: "01a18852-d434-7f75-b045-be9cce5dce80",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e13",
  description:
    "Archer tries to unify the Andorians, Tellarites and Vulcans in a plan to capture a marauder ship threatening to destabilize the region.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 13,
  publishedAt: "2005-02-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15622",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/13",
    },
  ],
  title: "United (2)",
  episodeType: "standard",
  stillPath: "/bQIZqCSnTR3UolWghOsXb8Whdee.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
