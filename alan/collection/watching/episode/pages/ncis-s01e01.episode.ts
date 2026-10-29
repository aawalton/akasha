import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e01 = {
  id: "01a1884b-ef61-7725-83c3-5a0111f4929c",
  type: "page-type/episode",
  slug: "ncis-s01e01",
  description:
    "While on Air Force One, a Navy commanding officer dies. Agents from the Navy NCIS decide to take the investigation into their own hands and also force a Secret Service Agent to help. Now the NCIS team has to figure out if the Navy officer's death was of natural causes or not.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 1,
  publishedAt: "2003-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334430",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/1",
    },
  ],
  title: "Yankee White",
  episodeType: "standard",
  stillPath: "/1nQMJ5o9X3gSTXLtF6azUtXMQ3U.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
