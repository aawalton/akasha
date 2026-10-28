import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const myHeroAcademiaSeason4 = {
  id: "01a183d4-accc-76d1-bed5-7d89b8fd25fa",
  type: "page-type/season",
  slug: "my-hero-academia-season-4",
  description:
    "With All for One out of the game, the evil world is on the brink of war. Shigaraki of the League of Villains and Overhaul of the Yakuza vie for dominance of the underworld. Meanwhile, Deku finds himself in another dangerous internship with his senior Mirio.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/my-hero-academia"],
  position: 4,
  publishedAt: "2019-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "125861",
      externalLink: "https://www.themoviedb.org/tv/65930/season/4",
    },
  ],
  title: "My Hero Academia Season 4",
  posterPath: "/YCI5ADVr0JBboX0V3C3apAOtNH.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Season
