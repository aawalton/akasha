import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e110 = {
  id: "01a183d1-bb52-7acd-8f1d-7c1c494e616a",
  type: "page-type/episode",
  slug: "naruto-s03e110",
  description:
    "Now that word of Sasuke's departure has spread to the Fifth Hokage, she calls upon the newest Chunin, Shikamaru, to put together a squad to bring Sasuke back to the village.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 110,
  publishedAt: "2004-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908087",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/110",
    },
  ],
  title: "Formation! The Sasuke Retrieval Squad",
  episodeType: "standard",
  stillPath: "/76reSjhya7j17HBFORfuDB4XrWt.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
