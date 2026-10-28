import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallSuperS01e13 = {
  id: "01a183dc-a493-767a-90c3-377278b00e4a",
  type: "page-type/episode",
  slug: "dragon-ball-super-s01e13",
  description:
    "Although Goku loses the Super Saiyan God form, he absorbs and retains its power, and continues to fight Beerus.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-super-season-1"],
  position: 13,
  publishedAt: "2015-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1113102",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1/episode/13",
    },
  ],
  title: "Goku, Surpass Super Saiyan God!",
  episodeType: "standard",
  stillPath: "/elOCxfoseAS2oK5WUo7JWBBn5dy.jpg",
  voteAverage: 9.1,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Episode
