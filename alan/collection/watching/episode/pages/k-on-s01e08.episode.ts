import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS01e08 = {
  id: "01a183da-4479-7d3c-a304-2531908acd3b",
  type: "page-type/episode",
  slug: "k-on-s01e08",
  description:
    "The second year of school begins! The Light Music Club tries to gather by any means necessary.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-1"],
  position: 8,
  publishedAt: "2009-05-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879082",
      externalLink: "https://www.themoviedb.org/tv/42253/season/1/episode/8",
    },
  ],
  title: "Freshman Reception!",
  episodeType: "standard",
  stillPath: "/swzH7K2L10n56JuV8LkymdKUjRM.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
