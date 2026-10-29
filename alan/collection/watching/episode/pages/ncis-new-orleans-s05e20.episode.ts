import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS05e20 = {
  id: "01a1884b-301c-7583-91c0-83546d1b007d",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s05e20",
  description:
    'When Elvis Bertrand\'s "daughter" is linked to an NCIS murder case, he asks Pride to prove her innocence.',
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-5"],
  position: 20,
  publishedAt: "2019-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1760812",
      externalLink: "https://www.themoviedb.org/tv/61387/season/5/episode/20",
    },
  ],
  title: "Jackpot",
  episodeType: "standard",
  stillPath: "/yUHTNJtWofDGOPkRry5C1AqVqa1.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
