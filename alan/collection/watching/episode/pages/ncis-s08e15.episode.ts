import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e15 = {
  id: "01a1884b-ef6d-76b7-955b-ca1fe00e5de7",
  type: "page-type/episode",
  slug: "ncis-s08e15",
  description:
    "A botched assassination attempt in Belgravia forces NCIS to protect the Defense Minister's daughter, who is studying in the U.S. and smitten with McGee.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 15,
  publishedAt: "2011-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334581",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/15",
    },
  ],
  title: "Defiance",
  episodeType: "standard",
  stillPath: "/8XeJUmlcSxN8zXdPkL6rhk9HTiM.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
