import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const arcaneS01e05 = {
  id: "01a1887d-dc25-78dc-a604-7154a3e8ff1c",
  type: "page-type/episode",
  slug: "arcane-s01e05",
  description:
    "Rogue enforcer Caitlyn tours the undercity to track down Silco. Jayce puts a target on his back trying to root out Piltover corruption.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/arcane-season-1"],
  position: 5,
  publishedAt: "2021-11-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3246866",
      externalLink: "https://www.themoviedb.org/tv/94605/season/1/episode/5",
    },
  ],
  title: "Everybody Wants to Be My Enemy",
  episodeType: "standard",
  stillPath: "/72Ti7nTKEAPgx4VSggb1ksl31rm.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T16:28:32.165Z",
  updatedAt: "2026-10-29T16:28:32.165Z",
} as const satisfies Episode
