import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS01e09 = {
  id: "01a183d8-99a5-71db-9525-2f5bf5609099",
  type: "page-type/episode",
  slug: "black-butler-s01e09",
  description:
    "The Young Master’s latest acquisition is a haunted camera which can photograph beings not of this world. Calamites are sure to follow when the servants set out to snap a shot of the elusive Butler.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-1"],
  position: 9,
  publishedAt: "2008-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "919025",
      externalLink: "https://www.themoviedb.org/tv/50712/season/1/episode/9",
    },
  ],
  title: "His Butler, Phantom Image",
  episodeType: "standard",
  stillPath: "/o83S6xkzjOj4wlyV1W9beK7jASR.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
