import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiTalesOfTheLesbianHunterLadyOfTheLyre = {
  id: "01a0b112-9107-7eae-a908-aa8bbb62994f",
  type: "page-type/track",
  slug: "vinny-marchi-tales-of-the-lesbian-hunter-lady-of-the-lyre",
  ownLength: 2.59765,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-tales-of-the-lesbian-hunter"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7yKYTBUeWuKaV2INlfzKgu",
      externalLink: "https://open.spotify.com/track/7yKYTBUeWuKaV2INlfzKgu",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Lady of the Lyre",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "ladyofthelyre|5USAMqcbMAzF3HBmeD5pJF|155859",
  song: "song/vinny-marchi-lady-of-the-lyre",
} as const satisfies Track
