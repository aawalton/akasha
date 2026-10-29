import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS05e01 = {
  id: "01a18851-3df7-7c1b-95b4-92798db7acbc",
  type: "page-type/episode",
  slug: "person-of-interest-s05e01",
  description:
    "Reese and Finch attempt to rescue the Machine’s source code before it deteriorates beyond repair. Also, Root fights for her life against an onslaught of Samaritan’s agents and Fusco is faced with hard questions following the deaths of Dominic and Elias.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-5"],
  position: 1,
  publishedAt: "2016-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1169348",
      externalLink: "https://www.themoviedb.org/tv/1411/season/5/episode/1",
    },
  ],
  title: "B.S.O.D.",
  episodeType: "standard",
  stillPath: "/2nZyv6ha46Rv4NuhDCaDV6ys2Q7.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
