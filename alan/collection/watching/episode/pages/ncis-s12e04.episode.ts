import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e04 = {
  id: "01a1884b-ef72-7b34-8e86-daf3e578e55b",
  type: "page-type/episode",
  slug: "ncis-s12e04",
  description:
    "The Secretary of the Navy assigns the NCIS team to a joint terrorism task force after a Naval research scientist is murdered and the lead suspect is wanted by the Russian government.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 4,
  publishedAt: "2014-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010121",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/4",
    },
  ],
  title: "Choke Hold",
  episodeType: "standard",
  stillPath: "/eIDH0vkKUvbzCUGPBgGVIm9tbdD.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
