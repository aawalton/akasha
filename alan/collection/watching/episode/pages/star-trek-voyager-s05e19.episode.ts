import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e19 = {
  id: "01a18853-ac90-7764-9969-2a9e5baae34f",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e19",
  description:
    "Stardate: Unknown. With Voyager pinned down by a fleet of bounty hunters, Janeway receives an offer from a group of geniuses infamous for solving unsolvable problems but asking unconventional prices.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 19,
  publishedAt: "1999-03-31",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113246",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/19",
    },
  ],
  title: "Think Tank",
  episodeType: "standard",
  stillPath: "/4yZHCpkVJlneVTxuUB8edB9tGtH.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
