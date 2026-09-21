import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheGreatestJourneyEssentialCollectionTheSoftGoodbye = {
  id: "01a0abea-7e1d-7bdf-9ac6-403c4c2d21a2",
  type: "page-type/track",
  slug: "celtic-woman-2-the-greatest-journey-essential-collection-the-soft-goodbye",
  ownLength: 3.9697666666666667,
  ownProgress: 3.9697666666666667,
  partOfCollections: ["release/celtic-woman-2-the-greatest-journey-essential-collection"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6qWfYJbhZ9BmRbbPNTtHiv",
      externalLink: "https://open.spotify.com/track/6qWfYJbhZ9BmRbbPNTtHiv",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Soft Goodbye",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thesoftgoodbye|6NWtt9pNOL2Gx7kBykdE5x|238186",
  song: "song/celtic-woman-the-soft-goodbye",
  carriedBy: [
    {
      release: "release/celtic-woman-2-the-greatest-journey-essential-collection",
      discNumber: 1,
      position: 8,
      externalId: "6qWfYJbhZ9BmRbbPNTtHiv",
      externalLink: "https://open.spotify.com/track/6qWfYJbhZ9BmRbbPNTtHiv",
    },
  ],
} as const satisfies Track
