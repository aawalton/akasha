import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e04 = {
  id: "01a18853-ddfd-7ec2-a588-e040b740b396",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e04",
  description:
    "In order to flee the pressure of the responsibility of being a rebel and a Jedi, Ezra goes on a rescue mission together with Chopper after they received a distress call. They are surprised to find out the ship in need belongs to Hondo Ohnaka. Hondo offers Ezra to join him.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 4,
  publishedAt: "2015-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1134614",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/4",
    },
  ],
  title: "Brothers of the Broken Horn",
  episodeType: "standard",
  stillPath: "/jjSKgPJplbyQqZvLHAS6iGwBz1N.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
