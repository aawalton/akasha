import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3WhatAreWordsFeatPeterHollensEvynneHollens = {
  id: "01a0676a-d730-703f-9598-ee3dd9ded23f",
  type: "page-type/release",
  slug: "the-piano-guys-3-what-are-words-feat-peter-hollens-evynne-hollens",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2015-05-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "79KdrBJ8WgikPcPZH5KUNL",
      externalLink: "https://open.spotify.com/album/79KdrBJ8WgikPcPZH5KUNL",
    },
  ],
  title: "What Are Words (feat. Peter Hollens & Evynne Hollens)",
} as const satisfies Release
