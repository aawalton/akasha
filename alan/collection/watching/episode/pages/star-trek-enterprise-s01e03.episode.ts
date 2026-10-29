import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e03 = {
  id: "01a18852-d42f-7b36-9388-d1f3fbdfdeab",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e03",
  description:
    "Captain Archer wants to convert curiosity into deeds and decides to enter a ship floating in space. Hoshi has trouble adjusting to life on Enterprise.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 3,
  publishedAt: "2001-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4428745",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/3",
    },
  ],
  title: "Fight or Flight",
  episodeType: "standard",
  stillPath: "/7z8mZ53bUgDJRZHlTXB5A8aLbfG.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
