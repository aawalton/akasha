import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e04 = {
  id: "01a18853-ac8d-7cac-a8b0-b3d44fa07a29",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e04",
  description:
    "Stardate: 51082.4. Chakotay is stranded on a planet where two races are trying to wipe each other out in a massive, planet-wide war.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 4,
  publishedAt: "1997-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113162",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/4",
    },
  ],
  title: "Nemesis",
  episodeType: "standard",
  stillPath: "/ojyB2PbhmOs44fPpK3IykKv2xcN.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
