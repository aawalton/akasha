import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e12 = {
  id: "01a18852-d432-7cfa-9771-637be6036c3e",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e12",
  description:
    "Religious zealots hijack Enterprise to use it as a weapon against the enemies of their faith.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 12,
  publishedAt: "2004-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15608",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/12",
    },
  ],
  title: "Chosen Realm",
  episodeType: "standard",
  stillPath: "/73ZYTLvplRtfcP7iVoXXhKkmCFN.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
