import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e15 = {
  id: "01a18853-ac8f-70a7-b589-5988cac9f187",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e15",
  description:
    "Stardate: 52619.2. When Janeway hatches a daring plan to steal technology from a crippled Borg ship, Seven is coerced into returning to the Borg collective.",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 15,
  publishedAt: "1999-02-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113229",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/15",
    },
  ],
  title: "Dark Frontier",
  episodeType: "standard",
  stillPath: "/8b5ZyUdCvMZpmtSjUGgPCrmgKcG.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
