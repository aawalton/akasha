import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiComeLittleChildrenComeLittleChildren = {
  id: "01a0b112-99bb-73ca-a786-0150ca9a8724",
  type: "page-type/track",
  slug: "vinny-marchi-come-little-children-come-little-children",
  ownLength: 2.57475,
  ownProgress: 2.57475,
  partOfCollections: ["release/vinny-marchi-come-little-children"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5YQuo1ly8Hdv4gHZYygFI1",
      externalLink: "https://open.spotify.com/track/5YQuo1ly8Hdv4gHZYygFI1",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Come Little Children",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0Sl22kYbJDXJoZvmOKe4XQ", artistName: "Ebucs" },
    { externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" },
  ],
  trackKey: "comelittlechildren|0Sl22kYbJDXJoZvmOKe4XQ,5USAMqcbMAzF3HBmeD5pJF|154485",
  song: "song/vinny-marchi-come-little-children",
  carriedBy: [
    {
      release: "release/vinny-marchi-come-little-children",
      discNumber: 1,
      position: 1,
      externalId: "5YQuo1ly8Hdv4gHZYygFI1",
      externalLink: "https://open.spotify.com/track/5YQuo1ly8Hdv4gHZYygFI1",
    },
  ],
} as const satisfies Track
