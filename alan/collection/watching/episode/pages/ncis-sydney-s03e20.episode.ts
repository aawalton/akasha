import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS03e20 = {
  id: "01a1884b-6703-78b3-86e9-280ecfd30dfe",
  type: "page-type/episode",
  slug: "ncis-sydney-s03e20",
  description:
    "The team faces the battle of their lives to stop The Collective and save those they hold dear.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-3"],
  position: 20,
  publishedAt: "2026-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7095311",
      externalLink: "https://www.themoviedb.org/tv/157950/season/3/episode/20",
    },
  ],
  title: "Killer",
  episodeType: "finale",
  stillPath: "/5fzbvdxRNgYaTRCiJGQOMAR6Wi1.jpg",
  voteAverage: 4.8,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
