import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiMyMotherToldMeMyMotherToldMe = {
  id: "01a0b112-9908-79c5-9369-1f9453c79153",
  type: "page-type/track",
  slug: "vinny-marchi-my-mother-told-me-my-mother-told-me",
  ownLength: 2.369866666666667,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-my-mother-told-me"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Y4nQSWnC0U9Sin2ZQ5Fbx",
      externalLink: "https://open.spotify.com/track/3Y4nQSWnC0U9Sin2ZQ5Fbx",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "My Mother Told Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "mymothertoldme|5USAMqcbMAzF3HBmeD5pJF|142192",
  song: "song/vinny-marchi-my-mother-told-me",
} as const satisfies Track
