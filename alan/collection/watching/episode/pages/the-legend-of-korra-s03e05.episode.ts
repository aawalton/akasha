import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLegendOfKorraS03e05 = {
  id: "01a18857-4fe5-77ac-975d-a67802139958",
  type: "page-type/episode",
  slug: "the-legend-of-korra-s03e05",
  description: "Korra's quest leads her and her friends to the metal city of Zaofu.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/book-three-change"],
  position: 5,
  publishedAt: "2014-07-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "991200",
      externalLink: "https://www.themoviedb.org/tv/33880/season/3/episode/5",
    },
  ],
  title: "The Metal Clan",
  episodeType: "standard",
  stillPath: "/1DGuf0HLWWvpOiVtztDMlSRKxQZ.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:25.891Z",
  updatedAt: "2026-10-29T15:46:25.891Z",
} as const satisfies Episode
