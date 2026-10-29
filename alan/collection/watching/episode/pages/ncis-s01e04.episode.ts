import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e04 = {
  id: "01a1884b-ef62-782b-b9bc-fd3ffbd5e6fb",
  type: "page-type/episode",
  slug: "ncis-s01e04",
  description:
    "The NCIS team investigate when a seaman's body is found at the bottom of the sea in his dress whites, with a ceremonial sword. They discover that he was addicted to an MMORPG. Now, the team must figure out how involved he was in the game and how far he would go to get revenge on his arch enemy, another sailor.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 4,
  publishedAt: "2003-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334433",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/4",
    },
  ],
  title: "The Immortals",
  episodeType: "standard",
  stillPath: "/idwhICSRe5a3K8mykKZV3aKeQpg.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
