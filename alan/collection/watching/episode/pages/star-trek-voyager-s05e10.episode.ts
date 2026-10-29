import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e10 = {
  id: "01a18853-ac8f-73a8-a0a6-d52c56686d3c",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e10",
  description:
    "Stardate: Unknown. When trying to transport illegal refugees through the territory of a xenophobic civilization, Janeway must put her trust in a defector who offers his help.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 10,
  publishedAt: "1998-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113214",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/10",
    },
  ],
  title: "Counterpoint",
  episodeType: "standard",
  stillPath: "/lbGjKPQqeWXGWS2YeyECAqoePzN.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
