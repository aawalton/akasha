import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS03e10 = {
  id: "01a18881-51a1-7e78-a765-3cfd5c56c6fc",
  type: "page-type/episode",
  slug: "white-collar-s03e10",
  description:
    "Neal and Mozzie must stay ahead of the FBI when one of the treasure's paintings is flagged.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-3"],
  position: 10,
  publishedAt: "2011-08-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596284",
      externalLink: "https://www.themoviedb.org/tv/21510/season/3/episode/10",
    },
  ],
  title: "Countdown",
  episodeType: "mid-season",
  stillPath: "/wUvfAD9331nd0PbBiRC3z7CDM3G.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
