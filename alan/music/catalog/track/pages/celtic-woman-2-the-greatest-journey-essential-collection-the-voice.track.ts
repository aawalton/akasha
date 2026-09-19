import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheGreatestJourneyEssentialCollectionTheVoice = {
  id: "01a0abea-7de3-758f-9d48-8109ea6a6b41",
  type: "page-type/track",
  slug: "celtic-woman-2-the-greatest-journey-essential-collection-the-voice",
  ownLength: 3.08955,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-greatest-journey-essential-collection"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7h6Ecll0SxsNZgojrhCP2D",
      externalLink: "https://open.spotify.com/track/7h6Ecll0SxsNZgojrhCP2D",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Voice",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thevoice|6NWtt9pNOL2Gx7kBykdE5x|185373",
  song: "song/celtic-woman-the-voice",
} as const satisfies Track
