import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiSugarStarsStarlight = {
  id: "01a0b112-942b-7459-b8f8-1ea31a12ebff",
  type: "page-type/track",
  slug: "vinny-marchi-sugar-stars-starlight",
  ownLength: 3.59615,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-sugar-stars"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7zSsJjwbgJ6sSdBWNFUJkS",
      externalLink: "https://open.spotify.com/track/7zSsJjwbgJ6sSdBWNFUJkS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Starlight",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "starlight|5USAMqcbMAzF3HBmeD5pJF|215769",
} as const satisfies Track
