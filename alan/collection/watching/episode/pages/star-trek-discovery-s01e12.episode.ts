import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS01e12 = {
  id: "01a18852-a9f5-7596-a85d-411f039adae1",
  type: "page-type/episode",
  slug: "star-trek-discovery-s01e12",
  description:
    "Burnham heads to the ISS Charon with a special \"gift\" for the Emperor. With the help of an unexpected source, Stamets gains clarity while trapped inside the mycelial network. Saru asks for L'Rell's help.",
  ownLength: 38,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-1"],
  position: 12,
  publishedAt: "2018-01-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1421214",
      externalLink: "https://www.themoviedb.org/tv/67198/season/1/episode/12",
    },
  ],
  title: "Vaulting Ambition",
  episodeType: "standard",
  stillPath: "/8JZsBmPBXgVaLk9z5Kt188KSaFc.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
