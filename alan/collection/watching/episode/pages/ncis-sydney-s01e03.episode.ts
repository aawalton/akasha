import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS01e03 = {
  id: "01a1884b-6700-7f7d-af87-e59df22fee09",
  type: "page-type/episode",
  slug: "ncis-sydney-s01e03",
  description:
    "When a shark spits out an arm wearing U.S. Navy equipment, the team's investigation tests the loyalty of a band of former Navy divers.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-1"],
  position: 3,
  publishedAt: "2023-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4738705",
      externalLink: "https://www.themoviedb.org/tv/157950/season/1/episode/3",
    },
  ],
  title: "Brothers in Arms",
  episodeType: "standard",
  stillPath: "/t11n1xfm04KCSGmdesZwK9Qwhpz.jpg",
  voteAverage: 5.1,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
