import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e18 = {
  id: "01a1884b-ef78-719f-a8dc-d7603e900de0",
  type: "page-type/episode",
  slug: "ncis-s16e18",
  description:
    "Torres relies on his team's investigative skills after he wakes up on a dilapidated fishing boat and is covered in blood and unable to remember the last 12 hours.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 18,
  publishedAt: "2019-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1738372",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/18",
    },
  ],
  title: "Mona Lisa",
  episodeType: "standard",
  stillPath: "/cHPPsnh210OEojjaZREkoMOZn3n.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
