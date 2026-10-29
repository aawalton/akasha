import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e09 = {
  id: "01a1884b-ef71-776d-a74e-f78380a034ff",
  type: "page-type/episode",
  slug: "ncis-s11e09",
  description:
    "After discovering the Secretary of the Navy was bugged during a confidential briefing, NSA Analyst Eleanor Bishop, who predicted the security breach in exact detail two years ago, partners with the NCIS team on the case.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 9,
  publishedAt: "2013-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "966707",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/9",
    },
  ],
  title: "Gut Check",
  episodeType: "standard",
  stillPath: "/niRsDQKUvcGSfKbDD69K0cREAXJ.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
