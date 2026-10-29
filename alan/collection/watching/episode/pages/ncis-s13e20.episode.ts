import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e20 = {
  id: "01a1884b-ef74-7180-b5f0-378603f0c802",
  type: "page-type/episode",
  slug: "ncis-s13e20",
  description:
    "Tony's identity is stolen by multiple perpetrators who go on to blackmail politicians.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 20,
  publishedAt: "2016-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1176050",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/20",
    },
  ],
  title: "Charade",
  episodeType: "standard",
  stillPath: "/6o1N2wJYv89YSYtnzVOjJ0fZahs.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
