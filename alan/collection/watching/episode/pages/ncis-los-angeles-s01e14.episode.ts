import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e14 = {
  id: "01a1884a-e0e8-7910-972b-a157f98ac351",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e14",
  description:
    "A crime scene poses a national security risk when the LA team discovers the location was used to create a deadly toxin which is now missing.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 14,
  publishedAt: "2010-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557294",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/14",
    },
  ],
  title: "LD50",
  episodeType: "standard",
  stillPath: "/7HdPr5ESwEiC54htazPQyRxAcju.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
