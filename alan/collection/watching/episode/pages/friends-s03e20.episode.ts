import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS03e20 = {
  id: "01a18848-c2bc-77a3-b60d-1e644f63a1cd",
  type: "page-type/episode",
  slug: "friends-s03e20",
  description:
    "Monica inherits a beautiful dollhouse that is too elaborate to play with, so Phoebe makes her own. Joey thinks he's found his true love, and Rachel's boss dates Chandler, placing her in a dangerous situation.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-3"],
  position: 20,
  publishedAt: "1997-04-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86306",
      externalLink: "https://www.themoviedb.org/tv/1668/season/3/episode/20",
    },
  ],
  title: "The One with the Dollhouse",
  episodeType: "standard",
  stillPath: "/qKaDNoe48je6AQIjNIM110c8SeY.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
