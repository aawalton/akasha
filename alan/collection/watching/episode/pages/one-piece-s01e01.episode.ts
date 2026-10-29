import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e01 = {
  id: "01a18884-52e3-7dcd-866a-e7fc347d5995",
  type: "page-type/episode",
  slug: "one-piece-s01e01",
  description:
    'A group of pirates lead by Alvida plunder a ship, only to find a barrel which contains a strange boy named Luffy. Luffy is on a mission to find the legendary treasure "One Piece" and he befriends the ship\'s cabin-boy, Coby, who actually wants to become a marine officer. Luffy defeats Alvida and the two journey on in search of crewmates.',
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 1,
  publishedAt: "1999-10-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "852692",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/1",
    },
  ],
  title: "I'm Luffy! The Man Who Will Become the Pirate King!",
  episodeType: "standard",
  stillPath: "/jQFsHzYKQDxvIpX42PqszYUmpn5.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
