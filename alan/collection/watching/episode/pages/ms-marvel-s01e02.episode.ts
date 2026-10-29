import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const msMarvelS01e02 = {
  id: "01a1887e-e2dd-752f-9600-d3f357bbb9ff",
  type: "page-type/episode",
  slug: "ms-marvel-s01e02",
  description:
    "Kamala and Bruno explore the source of her newfound powers just in time for a perilous adventure.",
  ownLength: 52,
  ownProgress: 52,
  partOfCollections: ["season/ms-marvel-miniseries"],
  position: 2,
  publishedAt: "2022-06-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3603689",
      externalLink: "https://www.themoviedb.org/tv/92782/season/1/episode/2",
    },
  ],
  title: "Crushed",
  episodeType: "standard",
  stillPath: "/aemUtd7mjsVy1A0L4mMWZR1kKNA.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T16:29:39.421Z",
  updatedAt: "2026-10-29T16:29:39.421Z",
} as const satisfies Episode
