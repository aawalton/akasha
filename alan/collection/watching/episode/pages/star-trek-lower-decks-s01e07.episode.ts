import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS01e07 = {
  id: "01a18852-f34a-7357-8060-471edebd568c",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s01e07",
  description:
    "Mariner tries to impress her best friend from Starfleet Academy who is now a visiting Captain. Boimler is sent to a Starfleet medical ship after a transporter accident puts him “out of phase.”",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-1"],
  position: 7,
  publishedAt: "2020-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2420905",
      externalLink: "https://www.themoviedb.org/tv/85948/season/1/episode/7",
    },
  ],
  title: "Much Ado About Boimler",
  episodeType: "standard",
  stillPath: "/posmARKCowthrzUleFGZRA9jgq0.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
