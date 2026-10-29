import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS10e10 = {
  id: "01a18848-c2c7-7dcb-88b0-a747a588f841",
  type: "page-type/episode",
  slug: "friends-s10e10",
  description:
    "After Phoebe and Rachel catch Chandler getting into a car with an unknown blonde woman, they follow them to the suburbs. Fearing that Chandler is cheating on Monica, they inform her and learn that the woman is a real estate agent. The pair has been secretly shopping for houses and struggling with how to tell their best friends about their plans. Together the friends reminisce about their good times in the apartment.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-10"],
  position: 10,
  publishedAt: "2004-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "87600",
      externalLink: "https://www.themoviedb.org/tv/1668/season/10/episode/10",
    },
  ],
  title: "The One Where Chandler Gets Caught",
  episodeType: "standard",
  stillPath: "/Md5d3VpR4MbP0MjbelfmDeB81A.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
