import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsYouDontKnowMe = {
  id: "01a0b112-93e5-7287-a19c-1129a286c93d",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-you-dont-know-me",
  ownLength: 3.0833666666666666,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "687gCgyJRoArwBfmxK7Qcd",
      externalLink: "https://open.spotify.com/track/687gCgyJRoArwBfmxK7Qcd",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "you don't know me!!",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "youdontknowme|5USAMqcbMAzF3HBmeD5pJF|185002",
} as const satisfies Track
