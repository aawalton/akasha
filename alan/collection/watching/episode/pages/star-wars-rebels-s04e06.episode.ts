import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e06 = {
  id: "01a18853-ddff-77f8-8914-7038d489ab11",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e06",
  description:
    "Ezra and Sabine steal an Imperial prototype TIE fighter but must rely on some unexpected help to escape from Thrawn.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 6,
  publishedAt: "2017-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1382173",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/6",
    },
  ],
  title: "Flight of the Defender",
  episodeType: "standard",
  stillPath: "/qnHpOsdyXVRoKRgZisCNfoFJrLW.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
