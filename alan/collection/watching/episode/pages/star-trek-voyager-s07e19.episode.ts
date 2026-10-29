import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e19 = {
  id: "01a18853-ac92-721d-a8d5-cdb6c787bf4f",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e19",
  description:
    "Stardate: 54704.5 - Q comes to Voyager and asks Janeway to help him teach lessons of responsibility to his troublesome son.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 19,
  publishedAt: "2001-04-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466845",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/19",
    },
  ],
  title: "Q2",
  episodeType: "standard",
  stillPath: "/qK4hk3nDr5T2cOrl3VRsLR38bwO.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
