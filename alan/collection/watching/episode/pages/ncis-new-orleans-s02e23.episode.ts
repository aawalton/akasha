import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e23 = {
  id: "01a1884b-3017-7b16-ba98-7fe8ccaa3574",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e23",
  description:
    "The NCIS team partners with Homeland Security after the murder of a Navy master diver is linked to chatter of a foreign attack on the city.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 23,
  publishedAt: "2016-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1190213",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/23",
    },
  ],
  title: "The Third Man",
  episodeType: "standard",
  stillPath: "/bax8iCmAno2PoBrFK0UAYJlgCQU.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
