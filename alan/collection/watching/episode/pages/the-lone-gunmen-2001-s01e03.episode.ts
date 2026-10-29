import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theLoneGunmen2001S01e03 = {
  id: "01a18880-39bf-73de-9d62-adeb0852c9ef",
  type: "page-type/episode",
  slug: "the-lone-gunmen-2001-s01e03",
  description:
    "Frohike has to disguise himself as the long-lost son of a woman who is believed to be a Nazi war criminal that the Gunmen are trying to smoke out of the woodwork. She was famed for poisoning the pastries of the French Resistance.",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/the-lone-gunmen-season-1"],
  position: 3,
  publishedAt: "2001-03-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "366314",
      externalLink: "https://www.themoviedb.org/tv/5715/season/1/episode/3",
    },
  ],
  title: "Eine Kleine Frohike",
  episodeType: "standard",
  stillPath: "/92U5qwqtUa8JgkRGMZWRxvZBQx8.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T16:31:07.198Z",
  updatedAt: "2026-10-29T16:31:07.198Z",
} as const satisfies Episode
