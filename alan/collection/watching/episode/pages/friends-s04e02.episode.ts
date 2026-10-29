import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e02 = {
  id: "01a18848-c2bd-7259-a1d9-5dcae4609014",
  type: "page-type/episode",
  slug: "friends-s04e02",
  description:
    "Phoebe believes that her adoptive mother's spirit resides in a cat that jumped into her guitar case in Central Perk.  Monica goes on a date with Rachel's hunky high-school boyfriend, who was cool in high-school, but a failure now. And when Joey and Chandler decide to sell the entertainment center, Joey takes stupidity to a new level.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 2,
  publishedAt: "1997-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86453",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/2",
    },
  ],
  title: "The One with the Cat",
  episodeType: "standard",
  stillPath: "/1zEnoQyjbystjf9nywj07dpMwza.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
