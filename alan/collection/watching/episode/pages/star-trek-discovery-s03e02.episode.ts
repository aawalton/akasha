import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS03e02 = {
  id: "01a18852-a9f6-7415-a29e-bf55f06e12fb",
  type: "page-type/episode",
  slug: "star-trek-discovery-s03e02",
  description:
    "The crew of the Discovery races to repair their ship after they crash. Tilly & Saru make a first contact looking for Burnham.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-3"],
  position: 2,
  publishedAt: "2020-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2387209",
      externalLink: "https://www.themoviedb.org/tv/67198/season/3/episode/2",
    },
  ],
  title: "Far from Home",
  episodeType: "standard",
  stillPath: "/8gyrr9c57cSrIv8xwtMz2pvZstr.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
