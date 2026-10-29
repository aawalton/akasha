import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e23 = {
  id: "01a18853-ac91-7d75-a4f2-84f6f4cf6865",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e23",
  description:
    "Stardate: Unknown. Kes returns to Voyager in a state of rage, blaming Captain Janeway for her past. Using her expanded Ocampan powers in a fit of revenge, she travels through time to deliver the crew to the Vidiians.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 23,
  publishedAt: "2000-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113359",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/23",
    },
  ],
  title: "Fury",
  episodeType: "standard",
  stillPath: "/5r8P9IDOWXvAbQluKOa0WLUyUUf.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
