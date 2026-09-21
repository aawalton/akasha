import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiGodIMissYourEyesGodIMissYourEyes = {
  id: "01a0b112-9b17-7991-b69e-1a8dab079ca5",
  type: "page-type/track",
  slug: "vinny-marchi-god-i-miss-your-eyes-god-i-miss-your-eyes",
  ownLength: 3.79145,
  ownProgress: 3.79145,
  partOfCollections: ["release/vinny-marchi-god-i-miss-your-eyes"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0cctSPZcjtBZTYpmx4z2DR",
      externalLink: "https://open.spotify.com/track/0cctSPZcjtBZTYpmx4z2DR",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "god i miss your eyes",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "godimissyoureyes|5USAMqcbMAzF3HBmeD5pJF|227487",
  song: "song/vinny-marchi-god-i-miss-your-eyes",
  carriedBy: [
    {
      release: "release/vinny-marchi-god-i-miss-your-eyes",
      discNumber: 1,
      position: 1,
      externalId: "0cctSPZcjtBZTYpmx4z2DR",
      externalLink: "https://open.spotify.com/track/0cctSPZcjtBZTYpmx4z2DR",
    },
  ],
} as const satisfies Track
