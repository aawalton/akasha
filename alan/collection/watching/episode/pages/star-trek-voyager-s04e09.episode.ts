import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e09 = {
  id: "01a18853-ac8d-76c9-b23a-8552ebeca8ef",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e09",
  description:
    "Stardate: 51425.4. While Chakotay and Paris remain on board Annorax's time ship, Janeway attempts to repair Voyager enough to pursue her crew members' abductors.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 9,
  publishedAt: "1997-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113195",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/9",
    },
  ],
  title: "Year of Hell (2)",
  episodeType: "standard",
  stillPath: "/cu2AqElRXlL0mCtbrBlqb6enM0Z.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
