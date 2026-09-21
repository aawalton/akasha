import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheGreatestJourneyEssentialCollectionDulaman = {
  id: "01a0abea-7e79-7330-9109-f77b1e46429d",
  type: "page-type/track",
  slug: "celtic-woman-2-the-greatest-journey-essential-collection-dulaman",
  ownLength: 3.0851,
  ownProgress: 3.0851,
  partOfCollections: ["release/celtic-woman-2-the-greatest-journey-essential-collection"],
  position: 11,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3i6oCxWyrIxTeBMTmICiYG",
      externalLink: "https://open.spotify.com/track/3i6oCxWyrIxTeBMTmICiYG",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Dúlaman",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "dulaman|6NWtt9pNOL2Gx7kBykdE5x|185106",
  song: "song/celtic-woman-dulaman",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-greatest-journey-essential-collection",
      discNumber: 1,
      position: 11,
      externalId: "3i6oCxWyrIxTeBMTmICiYG",
      externalLink: "https://open.spotify.com/track/3i6oCxWyrIxTeBMTmICiYG",
    },
  ],
} as const satisfies Track
