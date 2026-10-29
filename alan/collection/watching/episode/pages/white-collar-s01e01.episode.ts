import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS01e01 = {
  id: "01a18881-519f-71f0-b72f-e9cfce98ec4d",
  type: "page-type/episode",
  slug: "white-collar-s01e01",
  description:
    'When the trail of elusive criminal "The Dutchman" dead ends, FBI Agent Peter Burke teams up with a most unlikely partner to catch him - the imprisoned Neal Caffrey.',
  ownLength: 55,
  ownProgress: 55,
  partOfCollections: ["season/white-collar-season-1"],
  position: 1,
  publishedAt: "2009-10-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596256",
      externalLink: "https://www.themoviedb.org/tv/21510/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/zIXarSqB5xSYKJ4MCDNMOeabZKw.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
