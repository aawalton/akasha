import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const scorpionS04e05 = {
  id: "01a1887f-56d8-72e2-ba66-728f68db2308",
  type: "page-type/episode",
  slug: "scorpion-s04e05",
  description:
    "While attending a tech convention, Team Scorpion is taken hostage by a group attempting a virtual heist.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/scorpion-season-4"],
  position: 5,
  publishedAt: "2017-10-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1379522",
      externalLink: "https://www.themoviedb.org/tv/60797/season/4/episode/5",
    },
  ],
  title: "Sci Hard",
  episodeType: "standard",
  stillPath: "/aCAfuGFzjAcsmqvANEpxHEGgAk3.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:30:09.105Z",
  updatedAt: "2026-10-29T16:30:09.105Z",
} as const satisfies Episode
