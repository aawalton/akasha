import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS01e04 = {
  id: "01a1885a-2529-7bdd-8355-e9dfdae62fe3",
  type: "page-type/episode",
  slug: "young-sheldon-s01e04",
  description:
    "After choking on a breakfast sausage, Sheldon wrestles with his fear of solid foods and discovers comic books for the first time.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-1"],
  position: 4,
  publishedAt: "2017-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1371007",
      externalLink: "https://www.themoviedb.org/tv/71728/season/1/episode/4",
    },
  ],
  title: "A Therapist, a Comic Book, and a Breakfast Sausage",
  episodeType: "standard",
  stillPath: "/6OXQBjn8SG4zeJEfENyiB7WUpV.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
