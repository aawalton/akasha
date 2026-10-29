import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e16 = {
  id: "01a18852-d431-7c8b-8621-3e4d883f6b45",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e16",
  description:
    "The Enterprise crew find a small craft drifting in space and are surprised to find it contains a human corpse. More questions arise when the Suliban and Tholians make claims to the craft.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 16,
  publishedAt: "2003-02-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15584",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/16",
    },
  ],
  title: "Future Tense",
  episodeType: "standard",
  stillPath: "/84KLEJVjWnJODnSoz1PYtuyyjRn.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
