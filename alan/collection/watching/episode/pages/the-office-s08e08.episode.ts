import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS08e08 = {
  id: "01a18857-c36d-7b6c-8702-1f923f6e198e",
  type: "page-type/episode",
  slug: "the-office-s08e08",
  description:
    "Andy takes some of the office staff on a field trip to Gettysburg for inspiration. Meanwhile, the rest of the office, under orders from Robert California, are tasked with coming up with a new business idea for Dunder Mifflin. Kevin proposes several ideas that catch California's attention, although they are rather idiotic.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-8"],
  position: 8,
  publishedAt: "2011-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170314",
      externalLink: "https://www.themoviedb.org/tv/2316/season/8/episode/8",
    },
  ],
  title: "Gettysburg",
  episodeType: "standard",
  stillPath: "/kNRo8guMolaaumtZssQch8ErP6F.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
