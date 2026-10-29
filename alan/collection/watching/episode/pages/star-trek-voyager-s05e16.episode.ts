import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e16 = {
  id: "01a18853-ac8f-7a3d-9d69-8ecfe90d08cd",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e16",
  description:
    "Stardate: Unknown. Unable to resist his strong feelings for an alien woman, Ensign Kim breaks Starfleet protocol and engages in a torrid affair that lands him in hot water with the captain.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 16,
  publishedAt: "1999-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113241",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/16",
    },
  ],
  title: "The Disease",
  episodeType: "standard",
  stillPath: "/aG3BU1m9jMNB2cBp2hkm8xuPxQ7.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
