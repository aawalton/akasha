import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e09 = {
  id: "01a18852-a9f5-7ada-bc3d-0db7a5040665",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e09",
  description:
    "Bypassing Starfleet's orders, Lorca uses the U.S.S. Discovery crew's ultimate asset, the ship itself, in an effort to end the war with the Klingons once and for all.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 9,
  publishedAt: "2017-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1380336",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/9",
    },
  ],
  title: "Into the Forest I Go",
  episodeType: "standard",
  stillPath: "/8sisA21eGQqrTViVITSbHHowUFl.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
