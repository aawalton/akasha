import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS02e08 = {
  id: "01a18853-07ce-79ea-9d40-9cbb09f12445",
  type: "page-type/episode",
  slug: "star-trek-picard-s02e08",
  description:
    "With time running out before the launch of the Europa Mission, Picard and Guinan must free themselves from FBI custody. Seven and Raffi come face-to-face with Jurati and the horror of what she's become.",
  ownLength: 49,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-2"],
  position: 8,
  publishedAt: "2022-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3651753",
      externalLink: "https://www.themoviedb.org/tv/85949/season/2/episode/8",
    },
  ],
  title: "Mercy",
  episodeType: "standard",
  stillPath: "/rTHm0e67rRREIQ0pPiqWNHOBJbU.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
