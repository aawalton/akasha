import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS01e01 = {
  id: "01a18858-1d5b-798b-b661-0d5192a26498",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s01e01",
  description:
    "Maria and Luke start their new school where they pal up with another boy, Clyde. However, two of the teachers and the class genius turn out to be Slitheens in human form. They are shapeless smelly invaders from another planet whose aim is to destroy the Earth by turning off the Sun with the aid of a machine which Luke inadvertently helps them to start. The three teenagers are chased around the school by the Slitheen family.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-1"],
  position: 1,
  publishedAt: "2007-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "11997",
      externalLink: "https://www.themoviedb.org/tv/203/season/1/episode/1",
    },
  ],
  title: "Revenge of the Slitheen (1)",
  episodeType: "standard",
  stillPath: "/97qWpvKbVjFyfRvedEqiorhY2IP.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
