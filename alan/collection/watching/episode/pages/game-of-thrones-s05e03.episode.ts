import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS05e03 = {
  id: "01a18849-08b4-7668-a804-5ca946daeb8c",
  type: "page-type/episode",
  slug: "game-of-thrones-s05e03",
  description:
    "In Braavos, Arya sees the Many-Faced God. In King's Landing, Queen Margaery enjoys her new husband. Tyrion and Varys walk the Long Bridge of Volantis.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-5"],
  position: 3,
  publishedAt: "2015-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1045552",
      externalLink: "https://www.themoviedb.org/tv/1399/season/5/episode/3",
    },
  ],
  title: "High Sparrow",
  episodeType: "standard",
  stillPath: "/5b6eUi2w12ao24ug8cL5QqJFKig.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
