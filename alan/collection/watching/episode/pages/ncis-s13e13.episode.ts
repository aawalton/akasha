import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e13 = {
  id: "01a1884b-ef73-72a2-8b88-e408ea50e70a",
  type: "page-type/episode",
  slug: "ncis-s13e13",
  description:
    "While investigating the murder of a seaman who was set to testify before a grand jury, the NCIS team uncovers the resurgence of an international human-trafficking ring.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 13,
  publishedAt: "2016-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1154662",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/13",
    },
  ],
  title: "Déjà Vu",
  episodeType: "standard",
  stillPath: "/lIZAp08RaZTA23Zla9cIqFjDQt8.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
