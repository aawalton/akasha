import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS04e22 = {
  id: "01a18844-6110-773c-ad06-939a070f5796",
  type: "page-type/episode",
  slug: "clone-wars-s04e22",
  description:
    "Savage and Maul, now reunited, pursue Obi-Wan Kenobi in search of revenge, and the Jedi Knight finds himself forced to unite with a surprising ally to defend against the deadly siblings.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-4"],
  position: 22,
  publishedAt: "2012-03-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010398",
      externalLink: "https://www.themoviedb.org/tv/4194/season/4/episode/22",
    },
  ],
  title: "Revenge",
  episodeType: "finale",
  stillPath: "/6ZkH4Xx7iUgwC4OJ1HeQAZ8ZnCr.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
