import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e04 = {
  id: "01a18852-a9f5-7223-9dec-a49ceb591ed1",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e04",
  description:
    "With tensions and stakes high as Starfleet continues in their efforts to end the war with Klingons, Burnham begins to settle in to her new position aboard the U.S.S. Discovery.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 4,
  publishedAt: "2017-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1351434",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/4",
    },
  ],
  title: "The Butcher's Knife Cares Not for the Lamb's Cry",
  episodeType: "standard",
  stillPath: "/1Ic1cFpOw1E79PZlZGrp8gHo6z7.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
