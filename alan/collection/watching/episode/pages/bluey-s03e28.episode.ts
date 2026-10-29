import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e28 = {
  id: "01a18843-d155-7444-89f9-330c982510d8",
  type: "page-type/episode",
  slug: "bluey-s03e28",
  description:
    "Indy thinks she's no good because her model horse looks like a cow, but Calypso encourages her not to give up.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 28,
  publishedAt: "2022-06-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3781851",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/28",
    },
  ],
  title: "Stories",
  episodeType: "standard",
  stillPath: "/5GSGKHMO8umpNCwK5B0VDU1Jvy7.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
