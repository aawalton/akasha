import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e05 = {
  id: "01a18852-a9f6-7b39-a254-f56026cd5687",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e05",
  description:
    "After reuniting with what remains of Starfleet and the Federation, the U.S.S. Discovery and its crew must prove that a 930 year old crew and starship are exactly what this new future needs.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 5,
  publishedAt: "2020-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2387212",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/5",
    },
  ],
  title: "Die Trying",
  episodeType: "standard",
  stillPath: "/pZYeTnk127ThdYYDaek8c4OrSPC.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
