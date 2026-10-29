import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e04 = {
  id: "01a1884b-ef65-7906-8295-6cb0920ab944",
  type: "page-type/episode",
  slug: "ncis-s03e04",
  description:
    "When a corpse of a man is found inside a tomb that comes from the Civil War, the team discover that the victim, a Sergeant, was buried alive. During the investigation, Abby tracks down the last phone call of the victim.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 4,
  publishedAt: "2005-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334519",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/4",
    },
  ],
  title: "Silver War",
  episodeType: "standard",
  stillPath: "/aOiGUS1uvUeFg9q4TLrvGZhqFvq.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
