import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e121 = {
  id: "01a183d1-bb53-7b12-a08f-7c971d041494",
  type: "page-type/episode",
  slug: "naruto-s03e121",
  description:
    "With the Sasuke retrieval squad now split into individual battles, it's up to Naruto, Kiba and Shikamaru to stop the sound ninja. But little do they realize that there's more to their opponents than their basic techniques.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 121,
  publishedAt: "2005-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908098",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/121",
    },
  ],
  title: "To Each His Own Battle",
  episodeType: "standard",
  stillPath: "/lDmc1uDZWUCi429mVpWI1nhROt5.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
