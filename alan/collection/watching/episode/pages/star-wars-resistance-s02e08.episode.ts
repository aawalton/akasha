import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e08 = {
  id: "01a18853-f9b0-74b0-8312-ff324f791ded",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e08",
  description:
    "Doza attempts to meet a Resistance pilot from his past, but the pilot has been captured by the First Order.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 8,
  publishedAt: "2019-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1968333",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/8",
    },
  ],
  title: "Rendezvous Point",
  episodeType: "standard",
  stillPath: "/sOlhverEjVITzeGCcvYiQ1OoRa.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
