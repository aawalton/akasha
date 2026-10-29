import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e05 = {
  id: "01a18843-d14c-7668-9186-efcfc28ddc38",
  type: "page-type/episode",
  slug: "bluey-s01e05",
  description:
    "On a picnic in the park, Bluey and her friends play Shadowlands. But when Coco keeps taking shortcuts, Bluey has to show her that following the rules can make the game more fun.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 5,
  publishedAt: "2018-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1583486",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/5",
    },
  ],
  title: "Shadowlands",
  episodeType: "standard",
  stillPath: "/dJhXDWIufAgpx5I7mzZ38dY3hQU.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
