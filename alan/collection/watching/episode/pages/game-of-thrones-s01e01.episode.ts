import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS01e01 = {
  id: "01a18849-08b1-721c-8862-fb8db17463a9",
  type: "page-type/episode",
  slug: "game-of-thrones-s01e01",
  description:
    "Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon's place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.",
  ownLength: 62,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-1"],
  position: 1,
  publishedAt: "2011-04-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63056",
      externalLink: "https://www.themoviedb.org/tv/1399/season/1/episode/1",
    },
  ],
  title: "Winter Is Coming",
  episodeType: "standard",
  stillPath: "/o4IX9Mm0kpLITVANJMx7inyEUaY.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
