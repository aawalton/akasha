import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2EmeraldMusicalGemsTheVoice2013Version = {
  id: "01a0abea-6ca7-79ba-9aad-6cdaa8092fe5",
  type: "page-type/track",
  slug: "celtic-woman-2-emerald-musical-gems-the-voice-2013-version",
  ownLength: 3.1191,
  ownProgress: 0,
  partOfCollections: ["release/celtic-woman-2-emerald-musical-gems"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6izjnjngrKTb4J1mS7QU1v",
      externalLink: "https://open.spotify.com/track/6izjnjngrKTb4J1mS7QU1v",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Voice - 2013 Version",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6NWtt9pNOL2Gx7kBykdE5x", artistName: "Celtic Woman" }],
  trackKey: "thevoice2013version|6NWtt9pNOL2Gx7kBykdE5x|187146",
  song: "song/celtic-woman-the-voice",
} as const satisfies Track
