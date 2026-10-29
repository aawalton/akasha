import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS08e06 = {
  id: "01a18848-c2c4-7f12-9369-218d03e6dc7e",
  type: "page-type/episode",
  slug: "friends-s08e06",
  description:
    'Monica and Chandler decide to throw a costumed Halloween party. Meanwhile, Phoebe runs into Ursula, who\'s preparing to get married soon, and as a courtesy invites her and her fiancé to the party. When they finally meet, Phoebe takes an instant liking to him, but soon she discovers that he knows nothing about the "real" Ursula.',
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-8"],
  position: 6,
  publishedAt: "2001-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87285",
      externalLink: "https://www.themoviedb.org/tv/1668/season/8/episode/6",
    },
  ],
  title: "The One with the Halloween Party",
  episodeType: "standard",
  stillPath: "/etHUWVLhXpPHCbzH4uNNetEQkUq.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
