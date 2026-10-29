import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS03e23 = {
  id: "01a1884b-3019-7d55-95de-de9fb3db1aba",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s03e23",
  description:
    "After Pride is spotted tracking one of Mayor Hamilton’s accomplices, the suspect opens fire on a crowded street before disappearing.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-3"],
  position: 23,
  publishedAt: "2017-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1304532",
      externalLink: "https://www.themoviedb.org/tv/61387/season/3/episode/23",
    },
  ],
  title: "Down the Rabbit Hole",
  episodeType: "standard",
  stillPath: "/4f2vBv4dRVoh6KIb5MpmLmVA9Ia.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
