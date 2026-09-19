import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiLadyOfTheLyreLadyOfTheLyre = {
  id: "01a0b112-9613-756b-b62a-c07cbbb32f42",
  type: "page-type/track",
  slug: "vinny-marchi-lady-of-the-lyre-lady-of-the-lyre",
  ownLength: 2.6,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-lady-of-the-lyre"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "146ypBBbb54MhXB4L0mO5A",
      externalLink: "https://open.spotify.com/track/146ypBBbb54MhXB4L0mO5A",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lady of the Lyre",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "ladyofthelyre|5USAMqcbMAzF3HBmeD5pJF|156000",
  song: "song/vinny-marchi-lady-of-the-lyre",
} as const satisfies Track
