import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const attackOnTitanS03e10 = {
  id: "01a183d1-6a25-705b-8085-bb173d44f862",
  type: "page-type/episode",
  slug: "attack-on-titan-s03e10",
  description:
    "Kenny recalls the life which has brought him to death's door, but he gets to decide whether to live on or not.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/attack-on-titan-season-3"],
  position: 10,
  publishedAt: "2018-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1554580",
      externalLink: "https://www.themoviedb.org/tv/1429/season/3/episode/10",
    },
  ],
  title: "Friends",
  episodeType: "standard",
  stillPath: "/oIqiOCiui0wBkGImdxma4XfWsnJ.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:41:41.918Z",
  updatedAt: "2026-10-28T18:41:41.918Z",
} as const satisfies Episode
