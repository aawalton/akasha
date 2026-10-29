import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const battlestarGalactica2004S01e01 = {
  id: "01a18843-80e6-7549-afcb-8d778289c848",
  type: "page-type/episode",
  slug: "battlestar-galactica-2004-s01e01",
  description:
    "In the wake of the Cylon sneak attack, the ragtag fleet of human survivors is forced to play a deadly game of cat-and-mouse with their pursuers. Every 33 minutes, they make a jump to a new location. And every 33 minutes, the Cylons manage to find them. The pilots are on the brink of exhaustion, relying on artificial stimulants to keep fighting, and the civilians are beginning to doubt the leadership of Commander Adama and President Roslin.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/battlestar-galactica-miniseries"],
  position: 1,
  publishedAt: "2004-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "134132",
      externalLink: "https://www.themoviedb.org/tv/1972/season/1/episode/1",
    },
  ],
  title: "33",
  episodeType: "standard",
  stillPath: "/rmCx0A4T1F93777iRaOKtivb0ud.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:24:47.718Z",
  updatedAt: "2026-10-29T15:24:47.718Z",
} as const satisfies Episode
