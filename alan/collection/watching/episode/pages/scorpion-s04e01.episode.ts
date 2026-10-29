import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS04e01 = {
  id: "01a1887f-56d7-7c9d-93fd-8f1cc4884f2c",
  type: "page-type/episode",
  slug: "scorpion-s04e01",
  description:
    "Team Scorpion must work with their old nemesis Mark Collins in order to prevent the extinction of mankind. Also, Walter and Paige awkwardly navigate their new relationship.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-4"],
  position: 1,
  publishedAt: "2017-09-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1344040",
      externalLink: "https://www.themoviedb.org/tv/60797/season/4/episode/1",
    },
  ],
  title: "Extinction",
  episodeType: "standard",
  stillPath: "/qkPG0gsRivzP7Tco4lzNCFBmyWe.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
