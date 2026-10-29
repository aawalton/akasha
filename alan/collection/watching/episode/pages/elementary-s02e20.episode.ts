import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS02e20 = {
  id: "01a1887e-62a8-7968-8867-8d3b0043c442",
  type: "page-type/episode",
  slug: "elementary-s02e20",
  description:
    "A pickpocket dies of anthrax poisoning, putting Holmes and Watson on the trail of the toxin’s source in order to prevent more deaths.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/elementary-season-2"],
  position: 20,
  publishedAt: "2014-04-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "973954",
      externalLink: "https://www.themoviedb.org/tv/1415/season/2/episode/20",
    },
  ],
  title: "No Lack of Void",
  episodeType: "standard",
  stillPath: "/kFEevXjWTEtUptQFGaMzZmITdNm.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
