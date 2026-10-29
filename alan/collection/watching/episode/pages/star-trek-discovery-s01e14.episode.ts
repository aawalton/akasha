import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e14 = {
  id: "01a18852-a9f5-7431-b7e9-eee2d994f56e",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e14",
  description:
    "Burnham and the U.S.S. Discovery crew are faced with the harsh reality of the war during their absence. In order to move forward, Starfleet must use unconventional tactics and sources to take their next action against the Klingons.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 14,
  publishedAt: "2018-02-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1424404",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/14",
    },
  ],
  title: "The War Without, The War Within",
  episodeType: "standard",
  stillPath: "/4IQLqwohAzzdhCFPn2h7tYaqUmz.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
