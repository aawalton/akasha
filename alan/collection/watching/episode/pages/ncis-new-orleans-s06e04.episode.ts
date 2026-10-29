import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS06e04 = {
  id: "01a1884b-301d-738e-833e-1e1f6bc30430",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s06e04",
  description:
    "The team uncovers a sinister plot by a private detention center contracted by the government to house undocumented immigrants. Lasalle and Sebastian travel to Alabama to search for Lasalle's missing brother.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-6"],
  position: 4,
  publishedAt: "2019-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1953577",
      externalLink: "https://www.themoviedb.org/tv/61387/season/6/episode/4",
    },
  ],
  title: "Overlooked",
  episodeType: "standard",
  stillPath: "/9sulgcBEO65kEB9h7otqjhExJ6g.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
