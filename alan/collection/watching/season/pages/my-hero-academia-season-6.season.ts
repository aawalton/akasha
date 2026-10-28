import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const myHeroAcademiaSeason6 = {
  id: "01a183d4-accc-7b9c-b513-2b5d40afd895",
  type: "page-type/season",
  slug: "my-hero-academia-season-6",
  description:
    "Along with Bakugo and Todoroki, Deku interned at the office of the No. 1 Hero, Endeavor. Working hard in an environment rich in lessons, he improved as a hero and used Black Whip, a new Quirk that was hidden within One For All.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/my-hero-academia"],
  position: 6,
  publishedAt: "2022-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "236472",
      externalLink: "https://www.themoviedb.org/tv/65930/season/6",
    },
  ],
  title: "My Hero Academia Season 6",
  posterPath: "/iYu4cOtDRvzZyvBSjV2QR8t99MC.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Season
