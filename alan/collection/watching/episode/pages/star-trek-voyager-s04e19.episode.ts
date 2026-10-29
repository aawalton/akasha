import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e19 = {
  id: "01a18853-ac8e-7ced-8c02-7c8718bcd492",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e19",
  description:
    "Stardate: 51715.2. The crew must stop an artificial holodeck rendition of a World War II battle from spilling onto the decks of the ship while simultaneously dealing with a Hirogen takeover.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 19,
  publishedAt: "1998-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113196",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/19",
    },
  ],
  title: "The Killing Game (2)",
  episodeType: "standard",
  stillPath: "/dlAA5nkVmzOGINpirS1SDisB3Fk.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
