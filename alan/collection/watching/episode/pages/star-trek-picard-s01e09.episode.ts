import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekPicardS01e09 = {
  id: "01a18853-07ce-72b7-88f9-55c14a011ef3",
  type: "page-type/episode",
  slug: "star-trek-picard-s01e09",
  description:
    "Following an unconventional and dangerous transit, Picard and the crew finally arrive at Soji's home world, Coppelius. However, with Romulan warbirds on their tail, their arrival brings only greater danger as the crew discovers more than expected about the planet’s inhabitants.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-picard-season-1"],
  position: 9,
  publishedAt: "2020-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2057384",
      externalLink: "https://www.themoviedb.org/tv/85949/season/1/episode/9",
    },
  ],
  title: "Et in Arcadia Ego (1)",
  episodeType: "standard",
  stillPath: "/1aPyotpgY9u6kENHuTGo5aHHe5Q.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:45.292Z",
  updatedAt: "2026-10-29T15:41:45.292Z",
} as const satisfies Episode
