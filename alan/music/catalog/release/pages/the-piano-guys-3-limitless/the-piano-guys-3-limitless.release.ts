import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Limitless = {
  id: "01a0676a-d723-7035-a9f0-56e149ebab91",
  type: "page-type/release",
  slug: "the-piano-guys-3-limitless",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2018-11-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4PPZ216h9xlTOsjXPUMlPw",
      externalLink: "https://open.spotify.com/album/4PPZ216h9xlTOsjXPUMlPw",
    },
  ],
  title: "Limitless",
} as const satisfies Release
