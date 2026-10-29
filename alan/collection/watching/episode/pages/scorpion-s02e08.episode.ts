import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS02e08 = {
  id: "01a1887f-56d3-71cf-a49d-e77bf450bb25",
  type: "page-type/episode",
  slug: "scorpion-s02e08",
  description:
    "Team Scorpion helps the CIA locate a top-secret aircraft in Area 51 in order to raise money for Walter's research to save his sister's life.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/scorpion-season-2"],
  position: 8,
  publishedAt: "2015-11-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1116815",
      externalLink: "https://www.themoviedb.org/tv/60797/season/2/episode/8",
    },
  ],
  title: "Area 51",
  episodeType: "standard",
  stillPath: "/fR4L4c04kgNo1ZtMRQEI0qztZU6.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
