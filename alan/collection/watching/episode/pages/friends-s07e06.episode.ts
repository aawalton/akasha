import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS07e06 = {
  id: "01a18848-c2c2-73b7-b234-eab12f2c273c",
  type: "page-type/episode",
  slug: "friends-s07e06",
  description:
    "Joey and Ross accidentally take a nap together - and much to their dismay, find that they liked it. Phoebe and Rachel compete to become Monica's maid of honor.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-7"],
  position: 6,
  publishedAt: "2000-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87023",
      externalLink: "https://www.themoviedb.org/tv/1668/season/7/episode/6",
    },
  ],
  title: "The One with the Nap Partners",
  episodeType: "standard",
  stillPath: "/d2DIHHrmqqyaEEzwVF6kXGEFUuQ.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
