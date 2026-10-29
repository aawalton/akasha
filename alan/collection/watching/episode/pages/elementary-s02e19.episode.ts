import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS02e19 = {
  id: "01a1887e-62a8-7680-943a-37eea5234e5d",
  type: "page-type/episode",
  slug: "elementary-s02e19",
  description:
    "A serial killer known for biting his victims appears to be killing again, even though he was presumed dead.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/elementary-season-2"],
  position: 19,
  publishedAt: "2014-04-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "973547",
      externalLink: "https://www.themoviedb.org/tv/1415/season/2/episode/19",
    },
  ],
  title: "The Many Mouths of Aaron Colville",
  episodeType: "standard",
  stillPath: "/8XHFY5PIHgauYOfyoDOVU9l24Fx.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
