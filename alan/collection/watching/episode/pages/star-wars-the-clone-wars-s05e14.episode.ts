import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS05e14 = {
  id: "01a18854-50ad-760a-b360-7389e5e1539f",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s05e14",
  description:
    "Savage and Maul forge an alliance with Death Watch to target a common enemy: Obi-Wan Kenobi.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-5"],
  position: 14,
  publishedAt: "2013-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010375",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/14",
    },
  ],
  title: "Eminence",
  episodeType: "standard",
  stillPath: "/qM1IHczjj1mMprrsjihaVA0w0zD.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
