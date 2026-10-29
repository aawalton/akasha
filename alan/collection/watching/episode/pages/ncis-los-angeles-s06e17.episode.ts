import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS06e17 = {
  id: "01a1884a-e0ee-7f1e-bab2-5c5ec9f947cf",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s06e17",
  description:
    "Members of the team take a look into the death of an Afghan soldier training in America.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-6"],
  position: 17,
  publishedAt: "2015-03-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1044321",
      externalLink: "https://www.themoviedb.org/tv/17610/season/6/episode/17",
    },
  ],
  title: "Savoir Faire",
  episodeType: "standard",
  stillPath: "/pPlwRsFRuoj1yC86RqPBb5MyC8V.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
