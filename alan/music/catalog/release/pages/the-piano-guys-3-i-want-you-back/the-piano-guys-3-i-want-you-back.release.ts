import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3IWantYouBack = {
  id: "01a0676a-d721-7045-bcb2-4b42daca2b78",
  type: "page-type/release",
  slug: "the-piano-guys-3-i-want-you-back",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2015-03-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5a7vLKSs4aC23TWkl9Bwa8",
      externalLink: "https://open.spotify.com/album/5a7vLKSs4aC23TWkl9Bwa8",
    },
  ],
  title: "I Want You Back",
} as const satisfies Release
