import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayClocksRoyksoppTremblingHeartMix = {
  id: "01a0676a-d71b-7002-a64a-18eb074ee0a3",
  type: "page-type/release",
  slug: "coldplay-clocks-royksopp-trembling-heart-mix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2003-07-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4yGYKNWgAGMJrhxv7OVWia",
      externalLink: "https://open.spotify.com/album/4yGYKNWgAGMJrhxv7OVWia",
    },
  ],
  title: "Clocks (Royksopp Trembling Heart Mix)",
} as const satisfies Release
