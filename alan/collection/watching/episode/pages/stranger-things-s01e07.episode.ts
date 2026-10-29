import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS01e07 = {
  id: "01a18855-9112-73a8-850c-f6ad16f59763",
  type: "page-type/episode",
  slug: "stranger-things-s01e07",
  description:
    'Eleven struggles to reach Will, while Lucas warns that "the bad men are coming." Nancy and Jonathan show the police what Jonathan caught on camera.',
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-season-1"],
  position: 7,
  publishedAt: "2016-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1205906",
      externalLink: "https://www.themoviedb.org/tv/66732/season/1/episode/7",
    },
  ],
  title: "Chapter Seven: The Bathtub",
  episodeType: "standard",
  stillPath: "/arjP5c4qHLznbujCrrBVz4Z8Ykl.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
