import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e05 = {
  id: "01a18853-ddff-771c-9188-d4fc08e95b65",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e05",
  description:
    "Ezra and the Ghost crew are called back to Lothal when a new Imperial threat rises.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 5,
  publishedAt: "2017-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1382172",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/5",
    },
  ],
  title: "The Occupation",
  episodeType: "standard",
  stillPath: "/ohX6gCEBSFnFzDFcbmEkWvoDHac.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
