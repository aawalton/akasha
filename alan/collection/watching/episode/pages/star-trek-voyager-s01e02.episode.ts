import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS01e02 = {
  id: "01a18853-ac89-7213-8369-d6811267dfd2",
  type: "page-type/episode",
  slug: "star-trek-voyager-s01e02",
  description:
    "Stardate: 48439.7. As the Maquis crewmembers begin to integrate themselves into the Starfleet crew, Voyager becomes trapped in a quantum singularity.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-1"],
  position: 2,
  publishedAt: "1995-01-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112907",
      externalLink: "https://www.themoviedb.org/tv/1855/season/1/episode/2",
    },
  ],
  title: "Parallax",
  episodeType: "standard",
  stillPath: "/hnJ47U5G1PwWbVjDYnL09Ir3PWX.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
