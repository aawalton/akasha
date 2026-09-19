import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiForgetMyPhoneForgetMyPhone = {
  id: "01a0b112-97ef-7139-8fa9-e90ed49ad96f",
  type: "page-type/track",
  slug: "vinny-marchi-forget-my-phone-forget-my-phone",
  ownLength: 2.595066666666667,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-forget-my-phone"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6eE5jQ9nSoq0l4JcUujPWC",
      externalLink: "https://open.spotify.com/track/6eE5jQ9nSoq0l4JcUujPWC",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Forget My Phone",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "forgetmyphone|5USAMqcbMAzF3HBmeD5pJF|155704",
  song: "song/vinny-marchi-forget-my-phone",
} as const satisfies Track
