import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS01e06 = {
  id: "01a18859-6797-7b7f-8408-378b73efd98d",
  type: "page-type/episode",
  slug: "upload-s01e06",
  description:
    "Nathan is thrown when Nora goes on a Nitely date. Ingrid invites Nathan’s niece for a sleepover. Nathan and Nora suspect his damaged memories may lead to a greater conspiracy. Luke gets into a fight with Aleesha.",
  ownLength: 32,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-1"],
  position: 6,
  publishedAt: "2020-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2249647",
      externalLink: "https://www.themoviedb.org/tv/86248/season/1/episode/6",
    },
  ],
  title: "The Sleepover",
  episodeType: "standard",
  stillPath: "/nvnq353shovlbE5PJ2kuNnow3dy.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
