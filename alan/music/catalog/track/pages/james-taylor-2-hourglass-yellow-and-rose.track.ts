import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassYellowAndRose = {
  id: "01a0abeb-3b28-7966-bccc-c6a0bc8e8847",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-yellow-and-rose",
  ownLength: 4.8933333333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pX7MnSkQ2zJ0OhZbJy21C",
      externalLink: "https://open.spotify.com/track/7pX7MnSkQ2zJ0OhZbJy21C",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Yellow and Rose",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "yellowandrose|0vn7UBvSQECKJm2817Yf1P|293600",
  song: "song/james-taylor-yellow-and-rose",
} as const satisfies Track
