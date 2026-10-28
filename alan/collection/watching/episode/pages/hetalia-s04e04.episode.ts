import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS04e04 = {
  id: "01a183d7-7ce5-7650-aa2b-55b47c1576dd",
  type: "page-type/episode",
  slug: "hetalia-s04e04",
  description:
    "Little Russia is picked on by Mongolia, Denmark, and Sweden, is freaked out by Little Ukraine, is rejected by a hamster, and fights the Battle on the Ice against the Teutonic Order (Prussia).",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-4"],
  position: 4,
  publishedAt: "2013-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826967",
      externalLink: "https://www.themoviedb.org/tv/35138/season/4/episode/4",
    },
  ],
  title: "Russia and Friends",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
