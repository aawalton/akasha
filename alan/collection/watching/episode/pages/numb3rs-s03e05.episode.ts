import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const numb3rsS03e05 = {
  id: "01a1887f-0b97-706d-8d83-c1ed5d01b9b5",
  type: "page-type/episode",
  slug: "numb3rs-s03e05",
  description:
    "Don and the rest of the team investigate several attacks occurring on LA highways that may be connected.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/numb3rs-season-3"],
  position: 5,
  publishedAt: "2006-10-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "33415",
      externalLink: "https://www.themoviedb.org/tv/578/season/3/episode/5",
    },
  ],
  title: "Traffic",
  episodeType: "standard",
  stillPath: "/dS6387wfh2u3wabCIbbYBGSDPLY.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:29:49.843Z",
  updatedAt: "2026-10-29T16:29:49.843Z",
} as const satisfies Episode
