import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS02e06 = {
  id: "01a18849-3528-78fa-a0bc-1bcc4b8c5d23",
  type: "page-type/episode",
  slug: "good-witch-s02e06",
  description:
    "Cassie could be ready to take a chance on her feelings for Sam. Grace goes on a magical mission to fix a broken confidence.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-2"],
  position: 6,
  publishedAt: "2016-05-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1187214",
      externalLink: "https://www.themoviedb.org/tv/61864/season/2/episode/6",
    },
  ],
  title: "Risk",
  episodeType: "standard",
  stillPath: "/6TTwAxmEn1yIzmoOHfTWqJC7YuP.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
