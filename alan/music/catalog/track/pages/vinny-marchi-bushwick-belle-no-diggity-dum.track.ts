import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const vinnyMarchiBushwickBelleNoDiggityDum = {
  id: "01a0b112-8f50-753a-b172-2be7b33d0e47",
  type: "page-type/track",
  slug: "vinny-marchi-bushwick-belle-no-diggity-dum",
  ownLength: 3.1315,
  ownProgress: 0,
  partOfCollections: ["release/vinny-marchi-bushwick-belle"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5G3w4MRoOmzMHV8dj2HUMS",
      externalLink: "https://open.spotify.com/track/5G3w4MRoOmzMHV8dj2HUMS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "No Diggity Dum",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5USAMqcbMAzF3HBmeD5pJF", artistName: "Vinny Marchi" },
    { externalId: "0ZM2ioGGBOZ3NPTSUbuimj", artistName: "Bobby Bass" },
  ],
  trackKey: "nodiggitydum|0ZM2ioGGBOZ3NPTSUbuimj,5USAMqcbMAzF3HBmeD5pJF|187890",
  song: "song/vinny-marchi-no-diggity-dum",
} as const satisfies Track
