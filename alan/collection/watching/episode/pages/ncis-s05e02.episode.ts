import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e02 = {
  id: "01a1884b-ef67-7d53-aba1-22fc30f2d6fc",
  type: "page-type/episode",
  slug: "ncis-s05e02",
  description:
    "During an autopsy, Ducky makes a startling discovery that turns a murder of a Petty Officer into a search for a missing infant.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 2,
  publishedAt: "2007-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334456",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/2",
    },
  ],
  title: "Family",
  episodeType: "standard",
  stillPath: "/7CwMsV75KAxftVIpjtGSOZgB0Ll.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
