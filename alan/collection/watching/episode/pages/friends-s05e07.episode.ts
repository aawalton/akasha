import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS05e07 = {
  id: "01a18848-c2bf-7804-aab2-7de9422b8aaf",
  type: "page-type/episode",
  slug: "friends-s05e07",
  description:
    "Chandler and Joey let Ross move in with them once his marriage to Emily falls apart.  Meanwhile, Phoebe gets involved with the local health inspector and Rachel becomes convinced that Danny is trying to seduce her with mind games.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-5"],
  position: 7,
  publishedAt: "1998-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86544",
      externalLink: "https://www.themoviedb.org/tv/1668/season/5/episode/7",
    },
  ],
  title: "The One Where Ross Moves In",
  episodeType: "standard",
  stillPath: "/9hBS598Oi90z7A0CRISPbwJ9JPH.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
