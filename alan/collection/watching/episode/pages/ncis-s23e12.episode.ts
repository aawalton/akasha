import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS23e12 = {
  id: "01a1884b-ef85-7d70-bebb-2792a04248b1",
  type: "page-type/episode",
  slug: "ncis-s23e12",
  description:
    "A murdered drone pilot leads the team to a missing woman from McGee’s past and a relationship he thought was long behind him. But as the case deepens, McGee realizes her reappearance could unravel more than an investigation, it could change the course of his life.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-23"],
  position: 12,
  publishedAt: "2026-03-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6670296",
      externalLink: "https://www.themoviedb.org/tv/4614/season/23/episode/12",
    },
  ],
  title: "In Too Deep",
  episodeType: "standard",
  stillPath: "/fpSQLnQmZWiJnXPtTqcYMHeD5tb.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
