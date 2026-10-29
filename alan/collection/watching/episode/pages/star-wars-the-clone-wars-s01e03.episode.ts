import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS01e03 = {
  id: "01a18854-50a7-7007-b173-32e5864f88c4",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s01e03",
  description:
    "With the help of his Padawan Ahsoka and Jedi Master Plo Koon, Anakin utilizes new long-range Y-wing bombers to lead a bold strike on General Grievous' warship, the Malevolence, and its destructive weapon.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-1"],
  position: 3,
  publishedAt: "2008-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "286559",
      externalLink: "https://www.themoviedb.org/tv/4194/season/1/episode/3",
    },
  ],
  title: "Shadow of Malevolence",
  episodeType: "standard",
  stillPath: "/aaQY5tHmQSSFJBgqDmV4a0q5kgF.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
