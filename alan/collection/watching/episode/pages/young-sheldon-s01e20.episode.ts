import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS01e20 = {
  id: "01a1885a-252a-7e96-9303-67e1e0d9f1ce",
  type: "page-type/episode",
  slug: "young-sheldon-s01e20",
  description:
    "A battle erupts between the Coopers and Sparks when the Sparks' new dog terrorizes Sheldon.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-1"],
  position: 20,
  publishedAt: "2018-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1472850",
      externalLink: "https://www.themoviedb.org/tv/71728/season/1/episode/20",
    },
  ],
  title: "A Dog, a Squirrel, and a Fish Named Fish",
  episodeType: "standard",
  stillPath: "/4ltWFTgU75BOhvx0Ux0Vi1NfQwu.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
