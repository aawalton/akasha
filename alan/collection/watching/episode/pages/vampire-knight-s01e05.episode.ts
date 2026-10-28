import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vampireKnightS01e05 = {
  id: "01a183d8-f257-70fb-b810-e00f26f513c4",
  type: "page-type/episode",
  slug: "vampire-knight-s01e05",
  description:
    "A new ethics teacher arrives at Cross Academy. His atypical looks are all the buzz among the Day Class; even Zero has lost his usual composure.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/vampire-knight-season-1"],
  position: 5,
  publishedAt: "2008-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553027",
      externalLink: "https://www.themoviedb.org/tv/17149/season/1/episode/5",
    },
  ],
  title: "Moonlight Festivities",
  episodeType: "standard",
  stillPath: "/23ACJmm9bqKtaprceUxNkLh5DPf.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Episode
