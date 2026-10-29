import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e20 = {
  id: "01a18848-c2be-7543-9373-36af2fe3240d",
  type: "page-type/episode",
  slug: "friends-s04e20",
  description:
    "Chandler takes Joey to a sleep clinic when he starts snoring. After Ross asks Monica to pick up Emily's wedding dress, she tries it on and can't stop wearing it. Meanwhile, jealous of Ross's proposal to Emily, Rachel tries to talk Joshua into marriage.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 20,
  publishedAt: "1998-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86423",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/20",
    },
  ],
  title: "The One with All the Wedding Dresses",
  episodeType: "standard",
  stillPath: "/5HoqXdCE3NItOrlgKzE5HsUHuSE.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
