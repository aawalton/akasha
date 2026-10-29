import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS01e03 = {
  id: "01a18852-f34a-7e0b-9700-963db3df4ac2",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s01e03",
  description:
    'A new work protocol eliminating "buffer time" has the Lower Decks crew running ragged as they try to keep up with their tightened schedules. Ensign Mariner and Commander Ransom\'s mutual lack of respect comes to a head during an away mission.',
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-1"],
  position: 3,
  publishedAt: "2020-08-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2379181",
      externalLink: "https://www.themoviedb.org/tv/85948/season/1/episode/3",
    },
  ],
  title: "Temporal Edict",
  episodeType: "standard",
  stillPath: "/2SgcWq5W7SO7ijY8WmStJhbkxHB.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
