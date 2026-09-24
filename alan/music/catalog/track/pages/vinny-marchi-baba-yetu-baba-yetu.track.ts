import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBabaYetuBabaYetu = {
  id: "01a0b112-90e7-7d2d-969b-18f23bb7d838",
  type: "page-type/track",
  slug: "vinny-marchi-baba-yetu-baba-yetu",
  ownLength: 3.6075833333333334,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-baba-yetu"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Baba Yetu",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/vinny-marchi" }],
  trackKey: "babayetu|5USAMqcbMAzF3HBmeD5pJF|216455",
  song: "song/vinny-marchi-baba-yetu",
  carriedBy: [
    {
      release: "release/vinny-marchi-baba-yetu",
      discNumber: 1,
      position: 1,
      externalId: "5vk0vzanBvEcQ4GpNdNxZM",
      externalLink: "https://open.spotify.com/track/5vk0vzanBvEcQ4GpNdNxZM",
    },
  ],
} as const satisfies Track
