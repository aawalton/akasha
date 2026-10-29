import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisSydneyS03e04 = {
  id: "01a1884b-6701-7b73-a7e1-dc75a5fabc7c",
  type: "page-type/episode",
  slug: "ncis-sydney-s03e04",
  description:
    "A U.S. Navy pilot goes missing at a UFO hotspot in the Outback after being chased by bright lights.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-sydney-season-3"],
  position: 4,
  publishedAt: "2025-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6454680",
      externalLink: "https://www.themoviedb.org/tv/157950/season/3/episode/4",
    },
  ],
  title: "The Truth Is Outback",
  episodeType: "standard",
  stillPath: "/fprbn7rTxwwnUEjlq9g4hCnKnHj.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:33:25.376Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Episode
