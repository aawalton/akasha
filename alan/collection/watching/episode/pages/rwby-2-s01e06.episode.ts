import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const rwby2S01e06 = {
  id: "01a18884-8767-7abe-b068-c3546dff1094",
  type: "page-type/episode",
  slug: "rwby-2-s01e06",
  description:
    "Yang teams up with Blake to fight Ursae while Pyrrha explains the concept of Aura to Jaune.",
  ownLength: 7,
  ownProgress: 7,
  partOfCollections: ["season/rwby-volume-1"],
  position: 6,
  publishedAt: "2013-08-22",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "918556",
      externalLink: "https://www.themoviedb.org/tv/50137/season/1/episode/6",
    },
  ],
  title: "The Emerald Forest (1)",
  episodeType: "standard",
  stillPath: "/6AjwWSoWp8tzaGUFLZv0trkIjhq.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:35:49.223Z",
  updatedAt: "2026-10-29T16:35:49.223Z",
} as const satisfies Episode
