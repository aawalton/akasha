import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsWakeUpToYou = {
  id: "01a0b112-9383-7f8b-b990-5c2b88b468c1",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-wake-up-to-you",
  ownLength: 1.9777666666666667,
  ownProgress: 1.9777666666666667,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 6,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5niBirkmu67BDhhezZwX6Q",
      externalLink: "https://open.spotify.com/track/5niBirkmu67BDhhezZwX6Q",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "wake up to you",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "wakeuptoyou|5USAMqcbMAzF3HBmeD5pJF|118666",
  song: "song/vinny-marchi-wake-up-to-you",
  carriedBy: [
    {
      release: "release/vinny-marchi-sugar-stars",
      discNumber: 1,
      position: 6,
      externalId: "5niBirkmu67BDhhezZwX6Q",
      externalLink: "https://open.spotify.com/track/5niBirkmu67BDhhezZwX6Q",
    },
  ],
} as const satisfies Track
