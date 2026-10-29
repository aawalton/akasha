import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS03e04 = {
  id: "01a18881-51a1-7d88-9909-14f6e48b6152",
  type: "page-type/episode",
  slug: "white-collar-s03e04",
  description: "Peter and Neal help Mozzie rework a scam to prevent a mob war.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-3"],
  position: 4,
  publishedAt: "2011-06-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596276",
      externalLink: "https://www.themoviedb.org/tv/21510/season/3/episode/4",
    },
  ],
  title: "The Dentist of Detroit",
  episodeType: "standard",
  stillPath: "/bPTFKquSQxHpq9vNlc2gr6odxBq.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
