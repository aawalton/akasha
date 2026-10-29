import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS08e08 = {
  id: "01a1887e-1e4b-7cbf-9435-21dffe5633fc",
  type: "page-type/episode",
  slug: "castle-s08e08",
  description:
    "Castle and Beckett investigate the murder of a cruise ship entertainer, only to find themselves trapped at sea with the killer.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/castle-season-8"],
  position: 8,
  publishedAt: "2015-11-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1116407",
      externalLink: "https://www.themoviedb.org/tv/1419/season/8/episode/8",
    },
  ],
  title: "Mr. & Mrs. Castle",
  episodeType: "mid-season",
  stillPath: "/f49ZHiWYONBhwiF2ufQbVbJX4Tf.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
