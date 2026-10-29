import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const manifestS04e02 = {
  id: "01a1884a-400b-79f9-9550-5506f5864e56",
  type: "page-type/episode",
  slug: "manifest-s04e02",
  description:
    "Hidden voices on the black box draw Saanvi in. Cal sneaks to see an apprehended Henry. During a podcast appearance, Ben seeks help.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/manifest-season-4"],
  position: 2,
  publishedAt: "2022-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3917635",
      externalLink: "https://www.themoviedb.org/tv/79696/season/4/episode/2",
    },
  ],
  title: "All-Call",
  episodeType: "standard",
  stillPath: "/7csGSaZIlOE110ZrQ1TxkzGuFul.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:32:09.865Z",
  updatedAt: "2026-10-29T15:32:09.865Z",
} as const satisfies Episode
