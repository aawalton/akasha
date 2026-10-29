import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS02e12 = {
  id: "01a18849-545f-7346-b03a-f9a5d457d3cf",
  type: "page-type/episode",
  slug: "gravity-falls-s02e12",
  description:
    "Cornered underneath the Mystery Shack, Stan must finally reveal the secrets of his past and his mysterious portal to Dipper and Mabel.",
  ownLength: 31,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-2"],
  position: 12,
  publishedAt: "2015-07-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1080227",
      externalLink: "https://www.themoviedb.org/tv/40075/season/2/episode/12",
    },
  ],
  title: "A Tale of Two Stans",
  episodeType: "standard",
  stillPath: "/s6gHbBsSypA1kOg3CMDE3EdViHx.jpg",
  voteAverage: 9.2,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
