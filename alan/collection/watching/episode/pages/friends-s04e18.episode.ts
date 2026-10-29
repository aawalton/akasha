import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e18 = {
  id: "01a18848-c2be-71a2-879f-d1dfcc0387e8",
  type: "page-type/episode",
  slug: "friends-s04e18",
  description:
    "Rachel has an awkward encounter with Joshua's parents. Phoebe is offered the chance to name one of the triplets. Ross becomes paranoid when Emily goes to London with Susan.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 18,
  publishedAt: "1998-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86416",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/18",
    },
  ],
  title: "The One with Rachel's New Dress",
  episodeType: "standard",
  stillPath: "/lX0Ui3DMEyljM5oDWWfInQaGtRP.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
