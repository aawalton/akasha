import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS03e03 = {
  id: "01a18853-07cf-7950-9a35-c344174fe879",
  type: "page-type/episode",
  slug: "star-trek-picard-s03e03",
  description:
    "Picard grapples with an explosive, life-altering revelation, while the Titan and her crew try to outmaneuver a relentless Vadic in a lethal game of nautical cat and mouse. Meanwhile, Raffi and Worf uncover a nefarious plot from a vengeful enemy Starfleet has long since forgotten.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-3"],
  position: 3,
  publishedAt: "2023-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4218552",
      externalLink: "https://www.themoviedb.org/tv/85949/season/3/episode/3",
    },
  ],
  title: "Seventeen Seconds",
  episodeType: "standard",
  stillPath: "/xsvXThami3UIO48r3CsoBmRfYVB.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
