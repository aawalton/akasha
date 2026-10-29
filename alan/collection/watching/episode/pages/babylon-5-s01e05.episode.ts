import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S01e05 = {
  id: "01a18843-507e-7fbc-a231-96fbea9218e1",
  type: "page-type/episode",
  slug: "babylon-5-s01e05",
  description:
    "Sinclair's old flame, Catherine Sakai, arrives during a week-long festival when humans and aliens demonstrate their dominate religious beliefs.  An old enemy sends an assassin to kill G'Kar.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-signs-and-portents"],
  position: 5,
  publishedAt: "1994-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235798",
      externalLink: "https://www.themoviedb.org/tv/3137/season/1/episode/5",
    },
  ],
  title: "The Parliament of Dreams",
  episodeType: "standard",
  stillPath: "/rvbitfbugaXuSDhXbF3yRbKf0uf.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
