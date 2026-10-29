import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e04 = {
  id: "01a18857-c368-7015-ad6b-998dfe0c5b49",
  type: "page-type/episode",
  slug: "the-office-s04e04",
  description:
    "Michael is quickly going into debt with Jan renovating his condo. Meanwhile, it's a barn burner when Jim and Pam check in to the Schrute family farm, which has been converted into a bed-and-breakfast.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 4,
  publishedAt: "2007-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170250",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/4",
    },
  ],
  title: "Money",
  episodeType: "standard",
  stillPath: "/9H6T1taKasivezrcT1MTdNTPWah.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
