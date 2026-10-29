import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e24 = {
  id: "01a18853-ac8e-7834-9296-1a1c57a309d6",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e24",
  description:
    "Stardate: Unknown. Kim and Paris beam down to a hellish, barren planet to search for deuterium, a crucial energy source required to keep the ship running.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 24,
  publishedAt: "1998-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "954488",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/24",
    },
  ],
  title: "Demon",
  episodeType: "standard",
  stillPath: "/yTc5fedsWGHNGAHnaA6sBPD1hi4.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
