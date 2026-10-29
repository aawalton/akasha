import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e01 = {
  id: "01a1884b-ef72-7695-afed-440334c4e571",
  type: "page-type/episode",
  slug: "ncis-s12e01",
  description:
    "Gibbs and McGee travel to Russia to safely escort home an NCIS computer engineer with classified intel, but their mission is compromised and they are forced to go off the grid while hunted by a mercenary group.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 1,
  publishedAt: "2014-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010118",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/1",
    },
  ],
  title: "Twenty Klicks",
  episodeType: "standard",
  stillPath: "/tNtjnHjCwjboO9DWTFles6DYGqf.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
