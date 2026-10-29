import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const arcaneS01e03 = {
  id: "01a1887d-dc25-7960-a8a2-6e21aa01704c",
  type: "page-type/episode",
  slug: "arcane-s01e03",
  description:
    "An epic showdown between old rivals results in a fateful moment for Zaun. Jayce and Viktor risk it all for their research.",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/arcane-season-1"],
  position: 3,
  publishedAt: "2021-11-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3241291",
      externalLink: "https://www.themoviedb.org/tv/94605/season/1/episode/3",
    },
  ],
  title: "The Base Violence Necessary for Change",
  episodeType: "standard",
  stillPath: "/zCc7AEH53aH8r61F5f9DkIQGeZC.jpg",
  voteAverage: 9.1,
  createdAt: "2026-10-29T16:28:32.165Z",
  updatedAt: "2026-10-29T16:28:32.165Z",
} as const satisfies Episode
