import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanSendMeASong = {
  id: "01a0abea-78e4-769f-8b09-f813a16bc68c",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-send-me-a-song",
  ownLength: 4.34135,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "10UOzrWGHnyVPb3cHRoZrQ",
      externalLink: "https://open.spotify.com/track/10UOzrWGHnyVPb3cHRoZrQ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Send Me A Song",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "sendmeasong|6NWtt9pNOL2Gx7kBykdE5x|260481",
} as const satisfies Track
