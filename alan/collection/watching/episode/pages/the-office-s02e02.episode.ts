import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS02e02 = {
  id: "01a18857-c366-7d85-9ac2-55614ccea808",
  type: "page-type/episode",
  slug: "the-office-s02e02",
  description:
    "Just as corporate tells Toby, one of the workers at the Scranton branch, to give a seminar on sexual harassment issues, Michael receives a visit from his obnoxious sales-rep friend Todd Packer.  The two chauvinistic friends try to prove that the office is not in need of harassment counseling, but only wind up making the situation worse, causing yet another zany day at the office.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-2"],
  position: 2,
  publishedAt: "2005-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170150",
      externalLink: "https://www.themoviedb.org/tv/2316/season/2/episode/2",
    },
  ],
  title: "Sexual Harassment",
  episodeType: "standard",
  stillPath: "/rjluK6WlsCwDeyacRZQqiepDier.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
