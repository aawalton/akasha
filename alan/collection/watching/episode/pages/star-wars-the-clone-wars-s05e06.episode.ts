import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS05e06 = {
  id: "01a18854-50ac-7c8c-9454-16732019799c",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s05e06",
  description:
    "Ahsoka escorts a group of younglings to Ilum, where they will learn from Yoda and undergo a crucial rite of passage: the construction of their lightsabers. They grapple with both physical and inner challenges as they face the dangerous task ahead of them.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-5"],
  position: 6,
  publishedAt: "2012-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010367",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/6",
    },
  ],
  title: "The Gathering",
  episodeType: "standard",
  stillPath: "/whc4rULctGSZnctwWEqZZOegiTK.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
