import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS02e12 = {
  id: "01a1887f-56d3-7a46-9096-fdb289ed9115",
  type: "page-type/episode",
  slug: "scorpion-s02e12",
  description:
    "Team Scorpion must stop a catastrophe on Christmas Eve when heavy rain creates a large crack in a dam, putting an entire town in danger.",
  ownLength: 40,
  ownProgress: 40,
  partOfCollections: ["season/scorpion-season-2"],
  position: 12,
  publishedAt: "2015-12-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1140151",
      externalLink: "https://www.themoviedb.org/tv/60797/season/2/episode/12",
    },
  ],
  title: "Dam Breakthrough",
  episodeType: "standard",
  stillPath: "/jbWaItYTYqvBQSNeSY9iEOHd2GG.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
