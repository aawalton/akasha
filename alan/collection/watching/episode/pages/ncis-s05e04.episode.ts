import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e04 = {
  id: "01a1884b-ef67-7b90-b5a5-81caea402210",
  type: "page-type/episode",
  slug: "ncis-s05e04",
  description:
    "When Ducky realizes that one of his cadavers used for research is actually a victim of murder, the NCIS team identify him as a criminal genius who is capable of deleting the past.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 4,
  publishedAt: "2007-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334455",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/4",
    },
  ],
  title: "Identity Crisis",
  episodeType: "standard",
  stillPath: "/6ph2YRaJFHUBq1FM0fEqaGaPu8w.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
