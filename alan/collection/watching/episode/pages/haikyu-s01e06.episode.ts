import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const haikyuS01e06 = {
  id: "01a183d2-cc46-7674-85a8-fb9eb445476f",
  type: "page-type/episode",
  slug: "haikyu-s01e06",
  description:
    'Karasuno High School Volleyball Club has challenged Aoba Johsai High School to a practice match. But even before the match begins, Hinata\'s anxiety level reaches maximum. And Kageyama has a "reunion" with his ex-teammate Kindaichi, who now attends Aoba Johsai.',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/haikyu-season-1"],
  position: 6,
  publishedAt: "2014-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "986234",
      externalLink: "https://www.themoviedb.org/tv/60863/season/1/episode/6",
    },
  ],
  title: "An Interesting Team",
  episodeType: "standard",
  stillPath: "/cDCdZa9ccq87ITnKJpXLDO6sqeO.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T18:43:12.581Z",
} as const satisfies Episode
