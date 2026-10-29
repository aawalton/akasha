import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS05e07 = {
  id: "01a1885a-252e-7e29-bc63-bb2e24668b15",
  type: "page-type/episode",
  slug: "young-sheldon-s05e07",
  description:
    "Sheldon takes his first engineering class with Professor Boucher. Also, Meemaw and Dale help take care of his ex-wife, June.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-5"],
  position: 7,
  publishedAt: "2021-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3321928",
      externalLink: "https://www.themoviedb.org/tv/71728/season/5/episode/7",
    },
  ],
  title: "An Introduction to Engineering and a Glob of Hair Gel",
  episodeType: "standard",
  stillPath: "/n4uSGuTgk98c4llSOmRsxuUXzGF.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
