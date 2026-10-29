import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e16 = {
  id: "01a1884a-e0ee-7ffc-8f88-9a431ca1b21a",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e16",
  description:
    "After Sam is shot by a spy contracted by the CIA the team need the help of a Nepali soldier.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 16,
  publishedAt: "2015-02-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1041620",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/16",
    },
  ],
  title: "Expiration Date",
  episodeType: "standard",
  stillPath: "/l28jvf2edsIRQTuNzzMRjdBZlMu.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
