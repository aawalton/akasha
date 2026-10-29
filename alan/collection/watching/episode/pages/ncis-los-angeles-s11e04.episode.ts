import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e04 = {
  id: "01a1884a-e0f4-7b2d-ace7-31b34e6dfbf3",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e04",
  description:
    "While Callen and Sam are aboard the USS Allegiance, the ship is placed under quarantine for possible Ebola exposure. Also, Kensi and Deeks investigate the murder of a petty officer who recently departed the USS Allegiance and is linked to the Ebola exposure.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 4,
  publishedAt: "2019-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1953325",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/4",
    },
  ],
  title: "Yellow Jack",
  episodeType: "standard",
  stillPath: "/vpSjgoQfvtkkPTYh47PKXBgKylk.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
