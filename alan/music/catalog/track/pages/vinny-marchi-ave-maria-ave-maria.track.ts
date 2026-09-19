import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiAveMariaAveMaria = {
  id: "01a0b112-9b3d-73f5-9a83-f1a958c98855",
  type: "page-type/track",
  slug: "vinny-marchi-ave-maria-ave-maria",
  ownLength: 3.9335,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-ave-maria"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5TjhimqQne160MIG1iaCdv",
      externalLink: "https://open.spotify.com/track/5TjhimqQne160MIG1iaCdv",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ave Maria",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2p0UyoPfYfI76PCStuXfOP", artistName: "Franz Schubert" },
    { externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" },
  ],
  trackKey: "avemaria|2p0UyoPfYfI76PCStuXfOP,5USAMqcbMAzF3HBmeD5pJF|236010",
  song: "song/vinny-marchi-ave-maria",
} as const satisfies Track
