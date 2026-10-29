import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e05 = {
  id: "01a18853-ac8c-71b0-8ac1-75ca7bdd190f",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e05",
  description:
    "Stardate: 50074.3. The crew encounter a Bronze Age culture ruled by two “Sages” – a pair of Ferengi who arrived through a wormhole from the Alpha Quadrant.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 5,
  publishedAt: "1996-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113094",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/5",
    },
  ],
  title: "False Profits",
  episodeType: "standard",
  stillPath: "/bKP68dGOOaH4bFSz2fSWWu3fUAO.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
