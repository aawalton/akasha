import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e12 = {
  id: "01a1884a-e0ee-7fb2-8d96-9bc9ba43e0c0",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e12",
  description:
    "The team investigate an arms dealer but are interrupted as the suspect's building is overrun by terrorists.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 12,
  publishedAt: "2015-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1023032",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/12",
    },
  ],
  title: "Spiral",
  episodeType: "standard",
  stillPath: "/pBDYaUHVdvYyAtnlk16vxQJ1IZ9.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
