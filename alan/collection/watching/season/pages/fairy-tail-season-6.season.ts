import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const fairyTailSeason6 = {
  id: "01a183d7-2660-7ba5-90cc-9f738d3c2be4",
  type: "page-type/season",
  slug: "fairy-tail-season-6",
  description:
    "This season has 39 episodes containing the \"Tartaros\" (冥府の門タルタロス編, Tarutarosu-hen) arc, which adapts material from the rest of the manga's 40th volume to the middle of the 49th volume, depicting Fairy Tail's battle with a dark guild of Zeref's demons who aim to resurrect E.N.D., their master and Zeref's ultimate creation.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/fairy-tail"],
  position: 6,
  publishedAt: "2015-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "69400",
      externalLink: "https://www.themoviedb.org/tv/46261/season/6",
    },
  ],
  title: "Fairy Tail Season 6",
  posterPath: "/wsgfk09kkyYOUTJthJ4LaU7lsDg.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:47:57.774Z",
  updatedAt: "2026-10-28T18:47:57.774Z",
} as const satisfies Season
