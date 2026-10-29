import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS05e05 = {
  id: "01a18857-c369-7599-a35f-ee6ad28a7997",
  type: "page-type/episode",
  slug: "the-office-s05e05",
  description:
    "Pam is embarrassed when she is the only person at corporate wearing a costume on Halloween. Holly and Michael take the long trip to Nashua after they get some shocking news from corporate. Meanwhile, Dwight torments Andy and tries to get under his skin.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-5"],
  position: 5,
  publishedAt: "2008-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170211",
      externalLink: "https://www.themoviedb.org/tv/2316/season/5/episode/5",
    },
  ],
  title: "Employee Transfer",
  episodeType: "standard",
  stillPath: "/jRuZRhElmBHivu4BCui4Gzidwrg.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
