import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e16 = {
  id: "01a1884b-ef71-7533-bfa1-763428e1897a",
  type: "page-type/episode",
  slug: "ncis-s11e16",
  description: "Someone winds up dead when DiNozzo confronts a man impersonating a Navy officer.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 16,
  publishedAt: "2014-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "972445",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/16",
    },
  ],
  title: "Dressed to Kill",
  episodeType: "standard",
  stillPath: "/6XZne4VpZPzITqONKhP8C6A4RCv.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
