import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e15 = {
  id: "01a1884b-ef7b-743f-90ee-3dc0334c9f73",
  type: "page-type/episode",
  slug: "ncis-s18e15",
  description:
    "When members of an NCIS Regional Enforcement Action Capabilities Training Team (REACT) are killed during an explosion, NCIS Special Agent Jessica Knight, the lone surviving member, helps crack the case using high tech body armor.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 15,
  publishedAt: "2021-05-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2944667",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/15",
    },
  ],
  title: "Blown Away",
  episodeType: "standard",
  stillPath: "/zodGiL6FErRhLjnlQ7TQUfUDObf.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
