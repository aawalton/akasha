import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e17 = {
  id: "01a18857-c36f-7385-9ed3-b6f553db33b9",
  type: "page-type/episode",
  slug: "the-office-s09e17",
  description:
    "The adventures of Dwight at his family beet farm and bed-and-breakfast come to light. Here, he and his siblings receive a surprise inheritance. Back at the office, Todd Packer tries to atone for a lifetime of boorish behavior.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 17,
  publishedAt: "2013-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170328",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/17",
    },
  ],
  title: "The Farm",
  episodeType: "standard",
  stillPath: "/rtTNNuGbkeLJxQ0XJegQ7J3TNma.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
