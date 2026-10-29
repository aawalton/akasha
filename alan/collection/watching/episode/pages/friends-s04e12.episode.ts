import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS04e12 = {
  id: "01a18848-c2be-7997-9e91-f30ff21aa735",
  type: "page-type/episode",
  slug: "friends-s04e12",
  description:
    "Phoebe's uterus is examined for implantation of the embryos. Meanwhile, a seemingly harmless game between Chandler and Joey against Monica and Rachel escalates into a full blown contest where the stakes are raised higher and higher.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-4"],
  position: 12,
  publishedAt: "1998-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86407",
      externalLink: "https://www.themoviedb.org/tv/1668/season/4/episode/12",
    },
  ],
  title: "The One with the Embryos",
  episodeType: "standard",
  stillPath: "/nRXtaq1enijfiDwxzAPhJKkFtsu.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
