import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const thePianoGuys3IWantYouBack = {
  id: "01a0676a-d721-7045-bcb2-4b42daca2b78",
  type: "release",
  slug: "the-piano-guys-3-i-want-you-back",
  title: "I Want You Back",
  partOfCollections: ["the-piano-guys"],
  position: 0,
  ownLength: 3.017033,
  ownProgress: 3.017033,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-03-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5a7vLKSs4aC23TWkl9Bwa8",
      externalLink: "https://open.spotify.com/album/5a7vLKSs4aC23TWkl9Bwa8",
    },
  ],
} as const satisfies Release
