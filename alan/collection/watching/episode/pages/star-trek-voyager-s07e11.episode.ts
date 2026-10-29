import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e11 = {
  id: "01a18853-ac92-7382-a1ad-c263c71d7146",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e11",
  description:
    "Stardate: Unknown - A spatial anomaly divides Voyager into various time frames of the past and future, leaving Chakotay as the only person who may be able to put the pieces back together.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 11,
  publishedAt: "2001-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466837",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/11",
    },
  ],
  title: "Shattered",
  episodeType: "standard",
  stillPath: "/c5j0OBq4s4HdKsc0QV40G0hHESo.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
