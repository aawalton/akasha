import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const drStoneS04e30 = {
  id: "01a183d9-8fc4-7fda-80de-2ef2177e08e7",
  type: "page-type/episode",
  slug: "dr-stone-s04e30",
  description:
    "The team will need a stupidly insane amount of electricity to turn their bauxite into an aluminum rocket body.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dr-stone-season-4"],
  position: 30,
  publishedAt: "2026-05-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7155803",
      externalLink: "https://www.themoviedb.org/tv/86031/season/4/episode/30",
    },
  ],
  title: "Stone to Space",
  episodeType: "standard",
  stillPath: "/t4TIQWHDCy43rdpi5atiVsl7Ypa.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:50:35.838Z",
  updatedAt: "2026-10-28T18:50:35.838Z",
} as const satisfies Episode
