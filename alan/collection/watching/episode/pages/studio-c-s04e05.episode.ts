import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS04e05 = {
  id: "01a18885-00fa-7461-b4c8-d23540521b66",
  type: "page-type/episode",
  slug: "studio-c-s04e05",
  description:
    "The local nuclear facility has a little meltdown, mothers get their new anthem, and Mozart is entertained by his greatest student yet.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-4"],
  position: 5,
  publishedAt: "2014-05-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3721789",
      externalLink: "https://www.themoviedb.org/tv/68207/season/4/episode/5",
    },
  ],
  title: "Season 4 Episode 5",
  episodeType: "standard",
  stillPath: "/dm6Q3SIdZvHmB6ZQosgSFQFp5Pv.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
