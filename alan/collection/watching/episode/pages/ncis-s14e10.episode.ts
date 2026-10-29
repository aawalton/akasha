import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e10 = {
  id: "01a1884b-ef75-7877-b363-f6bdfc41510d",
  type: "page-type/episode",
  slug: "ncis-s14e10",
  description:
    "After the NCIS team tracks evidence from the murder of a Navy captain to Ducky’s deceased mother, Ducky looks back and questions a pivotal life choice he made 37 years ago.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 10,
  publishedAt: "2016-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1245141",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/10",
    },
  ],
  title: "The Tie That Binds",
  episodeType: "mid-season",
  stillPath: "/s4cR0tB3U9kTY0Xz8u1G00XqQH5.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
