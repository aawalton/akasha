import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS09e13 = {
  id: "01a18848-c2c6-7945-b034-ba40a98d63e3",
  type: "page-type/episode",
  slug: "friends-s09e13",
  description:
    "A night at Mike's piano bar gives Monica a very showy moment in the spotlight. Ross struggles to move on after witnessing Gavin and Rachel kiss. Meanwhile, Chandler employs his secret skill to repair Joey's botched eyebrow-waxing job.",
  ownLength: 31,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-9"],
  position: 13,
  publishedAt: "2003-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87443",
      externalLink: "https://www.themoviedb.org/tv/1668/season/9/episode/13",
    },
  ],
  title: "The One Where Monica Sings",
  episodeType: "standard",
  stillPath: "/upFUL4W5piQPWrHRwykCHNnlQe3.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
