import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS04e11 = {
  id: "01a18857-c369-765b-a2de-64f61386d6bd",
  type: "page-type/episode",
  slug: "the-office-s04e11",
  description:
    "Ryan returns to Scranton but not to a warm welcome. He is making everyone in the branch come in on a Saturday to re-enter data into the new website. Michael makes it clear that Ryan is the reason they have to come in on the weekend. The rest of the staff aren't happy knowing a computer will be getting credit for all of their sales.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-4"],
  position: 11,
  publishedAt: "2008-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170235",
      externalLink: "https://www.themoviedb.org/tv/2316/season/4/episode/11",
    },
  ],
  title: "Night Out",
  episodeType: "standard",
  stillPath: "/wMDAHVlVc0SmnlbaCKbgSDkn52a.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
