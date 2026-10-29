import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e22 = {
  id: "01a18853-ac8e-754d-9f06-066fba11714f",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e22",
  description:
    "Stardate: Unknown. An alien woman who requests asylum on board Voyager claims that she was onboard the ship a month ago, and she fell in love with Chakotay.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 22,
  publishedAt: "1998-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113184",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/22",
    },
  ],
  title: "Unforgettable",
  episodeType: "standard",
  stillPath: "/yzlK9Zw8hdaP8BCe8AnlbaVDolG.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
