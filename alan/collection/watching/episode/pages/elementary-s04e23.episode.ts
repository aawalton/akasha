import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS04e23 = {
  id: "01a1887e-62ac-7186-a127-19b0685c36db",
  type: "page-type/episode",
  slug: "elementary-s04e23",
  description:
    "When Holmes and Watson discover the perpetrator behind the attempt made on Morland’s life, they find a shocking connection to themselves.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/elementary-season-4"],
  position: 23,
  publishedAt: "2016-05-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1188295",
      externalLink: "https://www.themoviedb.org/tv/1415/season/4/episode/23",
    },
  ],
  title: "The Invisible Hand",
  episodeType: "standard",
  stillPath: "/qbuOoFNpFgtHSGG3iuKVtaBf0ir.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
