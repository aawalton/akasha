import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS06e03 = {
  id: "01a18849-352a-7fea-b4db-d440a241e8fa",
  type: "page-type/episode",
  slug: "good-witch-s06e03",
  description:
    "Cassie, Abigail and Joy browse an estate sale, where Joy hopes to find a clock for Martha's renovation. Stephanie's ex-husband, Wes, comes to town to pack up their shared cabin.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-6"],
  position: 3,
  publishedAt: "2020-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2234088",
      externalLink: "https://www.themoviedb.org/tv/61864/season/6/episode/3",
    },
  ],
  title: "The Clock",
  episodeType: "standard",
  stillPath: "/a9pDaemqChKR7CfIbD0lsEaBf9e.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
