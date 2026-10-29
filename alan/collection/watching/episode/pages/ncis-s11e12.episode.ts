import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e12 = {
  id: "01a1884b-ef71-7cd0-9aa2-9afe46dec84a",
  type: "page-type/episode",
  slug: "ncis-s11e12",
  description:
    "When a stolen drone is linked to the elusive terrorist Parsa, the NCIS team partners with the Department of Defense, including Gibb’s former girlfriend Hollis Mann, to track down the device before it is used for a large scale attack.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 12,
  publishedAt: "2014-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969951",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/12",
    },
  ],
  title: "Kill Chain",
  episodeType: "standard",
  stillPath: "/nm2ngcSGkBHPMrExqAEwxMxGC6B.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
