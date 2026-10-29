import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e20 = {
  id: "01a18853-ac90-7bc6-b5ff-e6830efd5c79",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e20",
  description:
    "Stardate: Unknown. An accident on a Malon freighter becomes a countdown to an explosive toxic-waste disaster, and preventing the explosion depends on Torres' ability to take control of a volatile mission.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 20,
  publishedAt: "1999-04-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113252",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/20",
    },
  ],
  title: "Juggernaut",
  episodeType: "standard",
  stillPath: "/xwTdDruspAEEFInepk8VmUGQmIN.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
