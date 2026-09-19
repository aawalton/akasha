import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyScarboroughFair = {
  id: "01a0abea-75fb-750a-b38c-132288f3f2bb",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-scarborough-fair",
  ownLength: 3.2162166666666665,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1U1NkDoPpCSEX1T6ZMWX04",
      externalLink: "https://open.spotify.com/track/1U1NkDoPpCSEX1T6ZMWX04",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Scarborough Fair",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "scarboroughfair|6NWtt9pNOL2Gx7kBykdE5x|192973",
  song: "song/celtic-woman-scarborough-fair",
} as const satisfies Track
