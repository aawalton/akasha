import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS02e05 = {
  id: "01a18849-3527-7f2d-a883-975e9c276b17",
  type: "page-type/episode",
  slug: "good-witch-s02e05",
  description:
    "Cassie is surprised with adventurous outings by both Sam and John as she works on sorting out her conflicted feelings.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-2"],
  position: 5,
  publishedAt: "2016-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1187213",
      externalLink: "https://www.themoviedb.org/tv/61864/season/2/episode/5",
    },
  ],
  title: "Surprise Me",
  episodeType: "standard",
  stillPath: "/gTcV6dJuKu8ou7gAyPb8Pni6cRF.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
