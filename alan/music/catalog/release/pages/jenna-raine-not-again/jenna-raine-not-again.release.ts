import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineNotAgain = {
  id: "01a0676a-d725-7078-a857-b5067e081d64",
  type: "page-type/release",
  slug: "jenna-raine-not-again",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2022-05-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5PYdawNgLyNhuJ3pp7xrvQ",
      externalLink: "https://open.spotify.com/album/5PYdawNgLyNhuJ3pp7xrvQ",
    },
  ],
  title: "NOT AGAIN",
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
