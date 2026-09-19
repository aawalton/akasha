import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiPoserRemasteredPoserRemastered = {
  id: "01a0b112-9855-7e4a-821c-79ad5c11a15e",
  type: "page-type/track",
  slug: "vinny-marchi-poser-remastered-poser-remastered",
  ownLength: 2.7301333333333333,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-poser-remastered"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4mjfyZy0jg32Aaa3Qjr7qb",
      externalLink: "https://open.spotify.com/track/4mjfyZy0jg32Aaa3Qjr7qb",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "POSER - remastered",
  trackType: "remaster",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" }],
  trackKey: "poserremastered|5USAMqcbMAzF3HBmeD5pJF|163808",
  song: "song/vinny-marchi-poser",
} as const satisfies Track
