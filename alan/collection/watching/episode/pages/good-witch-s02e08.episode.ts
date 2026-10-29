import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS02e08 = {
  id: "01a18849-3528-7b2a-b7fa-777da7294907",
  type: "page-type/episode",
  slug: "good-witch-s02e08",
  description:
    "Cassie attempts to work her magic to help Sam make a difficult decision and is suddenly faced with a difficult choice of her own.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-2"],
  position: 8,
  publishedAt: "2016-06-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1187216",
      externalLink: "https://www.themoviedb.org/tv/61864/season/2/episode/8",
    },
  ],
  title: "Truth",
  episodeType: "standard",
  stillPath: "/5Xr0ouDtj2u4zSaO7TY2eoYZqCW.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
