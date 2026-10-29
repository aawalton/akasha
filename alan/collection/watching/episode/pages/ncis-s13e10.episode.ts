import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e10 = {
  id: "01a1884b-ef73-7fe4-a761-8d4b259bc39a",
  type: "page-type/episode",
  slug: "ncis-s13e10",
  description:
    "The Secretary of Defense calls on NCIS to help a sailor who is battling leukemia to locate a donor for a bone marrow transplant, after two of his siblings are killed in the line of duty.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 10,
  publishedAt: "2015-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1134602",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/10",
    },
  ],
  title: "Blood Brothers",
  episodeType: "standard",
  stillPath: "/gHN2mRym1pL56h1KnbrSvx8vsER.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
