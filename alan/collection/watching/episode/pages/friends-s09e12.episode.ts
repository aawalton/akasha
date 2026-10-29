import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS09e12 = {
  id: "01a18848-c2c6-70d7-981e-ff4e8250460f",
  type: "page-type/episode",
  slug: "friends-s09e12",
  description:
    "Gavin gives Rachel a very interesting birthday gift while Ross begs Joey to stay away from Emma's hot new nanny. Meanwhile, Mike meets and then accidentally murders Phoebe's unusual pet.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-9"],
  position: 12,
  publishedAt: "2003-01-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87471",
      externalLink: "https://www.themoviedb.org/tv/1668/season/9/episode/12",
    },
  ],
  title: "The One with Phoebe's Rats",
  episodeType: "standard",
  stillPath: "/lTlqu2AsioTFRDiok3oVV0OFTGl.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
