import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theOfficeS06e04 = {
  id: "01a18857-c36b-779b-841b-1b2da647418d",
  type: "page-type/episode",
  slug: "the-office-s06e04",
  description:
    "The Dunder Mifflin staff head to Niagara Falls for Jim and Pam's wedding, with the understanding that her pregnancy is a forbidden discussion topic, but Jim's slip of the tongue prods Michael to attempt damage control.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/the-office-season-6"],
  position: 4,
  publishedAt: "2009-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "170182",
      externalLink: "https://www.themoviedb.org/tv/2316/season/6/episode/4",
    },
  ],
  title: "Niagara",
  episodeType: "standard",
  stillPath: "/dMRxj9BYrcmHMsvLwbC6IIoJ5QJ.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:46:55.461Z",
  updatedAt: "2026-10-29T15:46:55.461Z",
} as const satisfies Episode
