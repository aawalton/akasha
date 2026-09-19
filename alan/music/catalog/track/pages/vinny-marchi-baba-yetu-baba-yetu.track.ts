import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBabaYetuBabaYetu = {
  id: "01a0b112-90e7-7d2d-969b-18f23bb7d838",
  type: "page-type/track",
  slug: "vinny-marchi-baba-yetu-baba-yetu",
  ownLength: 3.6075833333333334,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-baba-yetu"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5vk0vzanBvEcQ4GpNdNxZM",
      externalLink: "https://open.spotify.com/track/5vk0vzanBvEcQ4GpNdNxZM",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Baba Yetu",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "babayetu|5USAMqcbMAzF3HBmeD5pJF|216455",
  song: "song/vinny-marchi-baba-yetu",
} as const satisfies Track
