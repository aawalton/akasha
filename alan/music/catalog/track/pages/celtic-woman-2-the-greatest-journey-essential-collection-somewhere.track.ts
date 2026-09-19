import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2TheGreatestJourneyEssentialCollectionSomewhere = {
  id: "01a0abea-7ef0-7e26-b98b-ecfc36aa15dc",
  type: "page-type/track",
  slug: "celtic-woman-2-the-greatest-journey-essential-collection-somewhere",
  ownLength: 2.2037666666666667,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-the-greatest-journey-essential-collection"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0w0cWR2FuDI8gPQ0F8wAjZ",
      externalLink: "https://open.spotify.com/track/0w0cWR2FuDI8gPQ0F8wAjZ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Somewhere",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "somewhere|6NWtt9pNOL2Gx7kBykdE5x|132226",
  song: "song/celtic-woman-somewhere",
} as const satisfies Track
