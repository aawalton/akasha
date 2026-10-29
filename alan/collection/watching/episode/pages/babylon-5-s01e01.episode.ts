import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S01e01 = {
  id: "01a18843-507e-7e92-9ad2-3258003ba0e6",
  type: "page-type/episode",
  slug: "babylon-5-s01e01",
  description:
    "When the Narn attack a Centauri colony, Londo and G'Kar nearly come to blows.  Meanwhile, raiders are attacking transport ships near the station.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-signs-and-portents"],
  position: 1,
  publishedAt: "1994-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235741",
      externalLink: "https://www.themoviedb.org/tv/3137/season/1/episode/1",
    },
  ],
  title: "Midnight on the Firing Line",
  episodeType: "standard",
  stillPath: "/uxZvirMIySCNncEe5cwUrfLE9hY.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
