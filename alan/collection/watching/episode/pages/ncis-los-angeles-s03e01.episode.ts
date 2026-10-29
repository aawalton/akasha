import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e01 = {
  id: "01a1884a-e0ea-729f-8143-7a5792a6ef87",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e01",
  description:
    "The Special Projects team travels to Romania to search for Hetty, while delving into the history of the Comescu crime family, and their connection to Callen.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 1,
  publishedAt: "2011-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557326",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/1",
    },
  ],
  title: "Lange, H.",
  episodeType: "standard",
  stillPath: "/9MEp4ut46KEQvcjN1cAvgDMfXHp.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
