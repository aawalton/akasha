import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e14 = {
  id: "01a1884a-e0f3-72ee-a993-ee36c64ac71e",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e14",
  description:
    "The NCIS team partners with the FBI to locate a terrorist cell in Los Angeles believed to be preparing for an imminent attack.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 14,
  publishedAt: "2019-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1687060",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/14",
    },
  ],
  title: "Smokescreen (1)",
  episodeType: "standard",
  stillPath: "/sk2czGbeHteQLxSkGtTgYzp3W4r.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
