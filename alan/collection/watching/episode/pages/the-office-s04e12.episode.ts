import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e12 = {
  id: "01a18857-c369-76b3-8cd7-f8a894905608",
  type: "page-type/episode",
  slug: "the-office-s04e12",
  description:
    'Pam is sporting a new look at work with her glasses. She admits she spent the night at a "friend\'s" house and forgot her contact solution. Michael makes sure to point out that the glasses make her look ugly, and if she wants to be hot, the glasses need to come off.',
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 12,
  publishedAt: "2008-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170243",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/12",
    },
  ],
  title: "Did I Stutter?",
  episodeType: "standard",
  stillPath: "/lKnvFZbzK1QXdeLn80YjmINfBOI.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
