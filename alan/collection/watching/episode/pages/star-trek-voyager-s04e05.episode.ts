import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e05 = {
  id: "01a18853-ac8d-70d4-93be-3484a5947d26",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e05",
  description:
    "Stardate: 51186.2. Torres and the Doctor assist a holographic ship's servant whose crew has been killed. Meanwhile, when Kim and Seven of Nine are assigned to work on a project together, the ensign attempts to get to know the person inside the mysterious former-Borg.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 5,
  publishedAt: "1997-10-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113163",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/5",
    },
  ],
  title: "Revulsion",
  episodeType: "standard",
  stillPath: "/mMnyW32dsDYaW1byqBXj5bLd5fl.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
