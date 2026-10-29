import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS12e01 = {
  id: "01a1884a-e0f5-7f22-8350-15016fbd3f67",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s12e01",
  description:
    "When a Russian bomber goes missing while flying over U.S. soil, Callen and Sam must track it down in the desert and secure its weapons and intel before the Russians on board destroy the plane. Meanwhile, Hetty gives Nell a cryptic assignment.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-12"],
  position: 1,
  publishedAt: "2020-11-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2476546",
      externalLink: "https://www.themoviedb.org/tv/17610/season/12/episode/1",
    },
  ],
  title: "The Bear",
  episodeType: "standard",
  stillPath: "/AhzrsZjzhoQqTtlzwOd9ocXVp3D.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
