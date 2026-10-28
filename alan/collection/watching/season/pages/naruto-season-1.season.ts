import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const narutoSeason1 = {
  id: "01a183d1-bb61-7d02-bdd6-af9cfaf5e833",
  type: "page-type/season",
  slug: "naruto-season-1",
  description:
    "Deep within the Hidden Leaf Village, young ninja Naruto Uzumaki carries sealed inside him the Nine-Tailed Fox Spirit, which once almost destroyed the village. Always an outcast because of his secret, now Naruto battles alongside his teammates Sasuke and Sakura to prove to himself and everyone else that he's the greatest ninja ever. But he's got a long list of challenges to face before he gets there!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/naruto"],
  position: 1,
  publishedAt: "2002-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54573",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1",
    },
  ],
  title: "Naruto Season 1",
  posterPath: "/rZN89Puog5PgKBLnJIyl7vyEReG.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Season
