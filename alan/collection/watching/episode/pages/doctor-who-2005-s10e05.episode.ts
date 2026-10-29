import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S10e05 = {
  id: "01a18883-f21a-785f-8f64-e28acf9d4943",
  type: "page-type/episode",
  slug: "doctor-who-2005-s10e05",
  description:
    '"Space - the final frontier. Final because it wants to kill us." Trapped on a space station with no oxygen, the Doctor, Bill and Nardole are horrified to discover the automated spacesuits keeping them alive are also trying to kill them!',
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/doctor-who-season-10"],
  position: 5,
  publishedAt: "2017-05-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1295792",
      externalLink: "https://www.themoviedb.org/tv/57243/season/10/episode/5",
    },
  ],
  title: "Oxygen",
  episodeType: "standard",
  stillPath: "/l7QmcUeYl7Y1Jf5QcN5Eiw9Yq2T.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
