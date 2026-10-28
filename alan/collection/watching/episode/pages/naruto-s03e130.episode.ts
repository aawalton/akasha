import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e130 = {
  id: "01a183d1-bb57-78de-a3b1-23af6be02b8d",
  type: "page-type/episode",
  slug: "naruto-s03e130",
  description:
    "As Sasuke squares off against Naruto, he reflects on his past when he was neglected by both his stern father and Itachi, his brooding older brother.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 130,
  publishedAt: "2005-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908107",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/130",
    },
  ],
  title: "Father and Son, the Broken Crest",
  episodeType: "standard",
  stillPath: "/4UemzF9CRd42xGxe15P5MG5S0V4.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
