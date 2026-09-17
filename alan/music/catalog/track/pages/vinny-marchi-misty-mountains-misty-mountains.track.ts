import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiMistyMountainsMistyMountains = {
  id: "01a0b112-9a06-7c49-87f4-6ad5a3b2c3c2",
  type: "page-type/track",
  slug: "vinny-marchi-misty-mountains-misty-mountains",
  ownLength: 3.153,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-misty-mountains"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6VWrUuAb8Bp51fBinsoziz",
      externalLink: "https://open.spotify.com/track/6VWrUuAb8Bp51fBinsoziz",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Misty Mountains",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" },
    { externalId: "7fLnGsF79xujfrOZmPMuEG", artistName: "Mia Asano" },
  ],
  trackKey: "mistymountains|5USAMqcbMAzF3HBmeD5pJF,7fLnGsF79xujfrOZmPMuEG|189180",
} as const satisfies Track
