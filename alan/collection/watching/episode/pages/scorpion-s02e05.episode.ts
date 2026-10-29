import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS02e05 = {
  id: "01a1887f-56d3-7514-8983-d8d2c4738ff8",
  type: "page-type/episode",
  slug: "scorpion-s02e05",
  description:
    "Team Scorpion goes undercover on the “Super Fun Guy” movie set in Kazakhstan in order to disable a soviet era nuclear missile being sold by terrorists.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/scorpion-season-2"],
  position: 5,
  publishedAt: "2015-10-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1109216",
      externalLink: "https://www.themoviedb.org/tv/60797/season/2/episode/5",
    },
  ],
  title: "Super Fun Guys",
  episodeType: "standard",
  stillPath: "/yxeSsG0Oq5TUOkti9nbnFwVi3I4.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
