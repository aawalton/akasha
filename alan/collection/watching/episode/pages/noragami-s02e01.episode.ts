import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const noragamiS02e01 = {
  id: "01a183d5-93f2-7fe3-8abc-88006661d4e4",
  type: "page-type/episode",
  slug: "noragami-s02e01",
  description:
    "Yato continues his daily routine as a delivery god who also slays Phantoms when the need arises. Elsewhere, Bishamon is plagued by nightmares from times long past…",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/noragami-season-2"],
  position: 1,
  publishedAt: "2015-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1148110",
      externalLink: "https://www.themoviedb.org/tv/64710/season/2/episode/1",
    },
  ],
  title: "Bearing a Posthumous Name",
  episodeType: "standard",
  stillPath: "/5wDIYJYG7U2OyW7WrNId6rirOlJ.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:46:14.769Z",
  updatedAt: "2026-10-28T18:46:14.769Z",
} as const satisfies Episode
