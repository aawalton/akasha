import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e04 = {
  id: "01a1884a-e0ee-7d7a-ae8e-c92f82935aaa",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e04",
  description:
    "The team learns that someone from their past is targeting one of their own. Nate Getz attempts to help Nell get through a traumatic experience.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 4,
  publishedAt: "2014-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010649",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/4",
    },
  ],
  title: "The 3rd Choir",
  episodeType: "standard",
  stillPath: "/s1FgcycUH9C0XUGP6HHL2gAA2q8.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
