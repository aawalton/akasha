import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e13 = {
  id: "01a18853-ac8e-7dbd-87d3-707d2a3d1453",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e13",
  description:
    "Stardate: 51471.3. The crew is 'attacked' by a species of alien that live in the human dream state. It is up to Chakotay, with extensive knowledge about the dream state, to save the ship and its crew.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 13,
  publishedAt: "1998-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113171",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/13",
    },
  ],
  title: "Waking Moments",
  episodeType: "standard",
  stillPath: "/eRCAtbNY6Sx96kRBXBQPoyPAPXh.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
