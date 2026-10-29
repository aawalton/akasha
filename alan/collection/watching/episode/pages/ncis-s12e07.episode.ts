import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e07 = {
  id: "01a1884b-ef72-723a-b2c0-7acd83b652aa",
  type: "page-type/episode",
  slug: "ncis-s12e07",
  description:
    "After investigating the murder of a retired Master Sergeant, the NCIS team uncovers a fraudulent charity that preys on those searching for missing military personnel.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 7,
  publishedAt: "2014-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010124",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/7",
    },
  ],
  title: "The Searchers",
  episodeType: "standard",
  stillPath: "/eFTHZUiC4fkWxR9tQlVl81LbJg8.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
