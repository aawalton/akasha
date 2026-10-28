import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e23 = {
  id: "01a183d7-7ce3-7f27-80ad-969d99024a71",
  type: "page-type/episode",
  slug: "hetalia-s03e23",
  description:
    "Austria winds up having to live with Germany in the story of The Austrian Anschluss. Chibi Romano is confronted by a mysterious masked man wielding a sword (Turkey).",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 23,
  publishedAt: "2010-08-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797742",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/23",
    },
  ],
  title: "The Annexation of Austria",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
