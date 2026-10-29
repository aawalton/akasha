import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS05e05 = {
  id: "01a1884a-e0ec-70a8-9acc-74bbcbd89a8d",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s05e05",
  description:
    "Analyst Nell Jones joins the NCIS: LA team in the field when a former Navy officer’s girlfriend is kidnapped in exchange for Navy intelligence. Meanwhile, Deeks unknowingly breaks one of Hetty’s rules.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-5"],
  position: 5,
  publishedAt: "2013-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968354",
      externalLink: "https://www.themoviedb.org/tv/17610/season/5/episode/5",
    },
  ],
  title: "Unwritten Rule",
  episodeType: "standard",
  stillPath: "/9LNGYFSYSvpEAAuB1B4nzOTK6VZ.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
