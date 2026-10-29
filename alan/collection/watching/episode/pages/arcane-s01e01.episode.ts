import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const arcaneS01e01 = {
  id: "01a1887d-dc25-79e9-8001-87b611a2a389",
  type: "page-type/episode",
  slug: "arcane-s01e01",
  description:
    "Orphaned sisters Vi and Powder bring trouble to Zaun's underground streets in the wake of a heist in posh Piltover.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/arcane-season-1"],
  position: 1,
  publishedAt: "2021-11-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1953812",
      externalLink: "https://www.themoviedb.org/tv/94605/season/1/episode/1",
    },
  ],
  title: "Welcome to the Playground",
  episodeType: "standard",
  stillPath: "/g7dMkFJvJECDYoL0TRzGQCfF3xD.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:28:32.165Z",
  updatedAt: "2026-10-29T16:28:32.165Z",
} as const satisfies Episode
