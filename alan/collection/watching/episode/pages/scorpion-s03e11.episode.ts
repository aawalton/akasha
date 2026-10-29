import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS03e11 = {
  id: "01a1887f-56d6-7ed4-b957-b8d5d20184c8",
  type: "page-type/episode",
  slug: "scorpion-s03e11",
  description:
    "It’s Christmas Eve and Team Scorpion’s electronics-free mountain getaway turns deadly when they come across gun-runners, and Ralph is kidnapped when they try to escape.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-3"],
  position: 11,
  publishedAt: "2016-12-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1244978",
      externalLink: "https://www.themoviedb.org/tv/60797/season/3/episode/11",
    },
  ],
  title: "Wreck the Halls",
  episodeType: "standard",
  stillPath: "/8KWA6L6SRChjm5jekaFwOjKCTxO.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
