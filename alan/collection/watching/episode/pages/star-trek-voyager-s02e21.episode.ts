import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e21 = {
  id: "01a18853-ac8b-709c-92db-1db33ec536fa",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e21",
  description:
    "Stardate: 49548.7. An accident in a plasma cloud duplicates Voyager after they are attacked by the Vidiians. During the aftermath, the ship is severely damaged, Ensign Wildman's baby dies and Harry Kim is sucked into space through a hull breach.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 21,
  publishedAt: "1996-03-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113060",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/21",
    },
  ],
  title: "Deadlock",
  episodeType: "standard",
  stillPath: "/wyNHNMFfTbFCUN352Rt0EYp1Euw.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
