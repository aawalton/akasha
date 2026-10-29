import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e10 = {
  id: "01a1884b-ef6c-7464-94a5-540cb038b2dc",
  type: "page-type/episode",
  slug: "ncis-s08e10",
  description:
    "The NCIS team investigates the disappearance of a Petty Officer who is the sole witness in an upcoming murder trial.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 10,
  publishedAt: "2010-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334574",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/10",
    },
  ],
  title: "False Witness",
  episodeType: "mid-season",
  stillPath: "/yWC1gbrdMIeDdN3v8AFa0tG2RoN.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
