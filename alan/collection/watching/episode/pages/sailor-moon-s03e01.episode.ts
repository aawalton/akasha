import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS03e01 = {
  id: "01a183d8-4895-7bab-bbc9-6754c480748e",
  type: "page-type/episode",
  slug: "sailor-moon-s03e01",
  description:
    "After she experiences apocalyptic visions, Rei is attacked by an extremely powerful monster that Sailor Moon cannot fight.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-3"],
  position: 1,
  publishedAt: "1994-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992400",
      externalLink: "https://www.themoviedb.org/tv/3570/season/3/episode/1",
    },
  ],
  title: "Star Struck, Bad Luck",
  episodeType: "standard",
  stillPath: "/bAXHawvnG5bHKj8MIucXXo7plOD.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
