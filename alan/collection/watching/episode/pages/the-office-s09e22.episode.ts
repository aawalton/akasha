import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS09e22 = {
  id: "01a18857-c36f-7b82-a77d-e48c5e83f224",
  type: "page-type/episode",
  slug: "the-office-s09e22",
  description:
    'Jim convinces Dwight that he needs to choose someone to act as an Assistant to the Assistant Regional Manager; the two subsequently hold tryouts for the position. After her daycare turns away her child, Angela is forced to bring her kid to work. Andy auditions for "The Next Great A Cappella Sensation".',
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-9"],
  position: 22,
  publishedAt: "2013-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170334",
      externalLink: "https://www.themoviedb.org/tv/2316/season/9/episode/22",
    },
  ],
  title: "A.A.R.M.",
  episodeType: "standard",
  stillPath: "/m3Wcby9maE08RaH3mS7aAHw5hkM.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
