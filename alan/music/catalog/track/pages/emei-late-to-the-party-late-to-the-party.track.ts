import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiLateToThePartyLateToTheParty = {
  id: "01a0c43e-7e44-725d-af3b-a4583433bbb7",
  type: "page-type/track",
  slug: "emei-late-to-the-party-late-to-the-party",
  ownLength: 2.952933333333333,
  ownProgress: 2.952933333333333,
  partOfCollections: ["release/emei-late-to-the-party"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hdMPlOGOngKH3mj4pVLcG",
      externalLink: "https://open.spotify.com/track/7hdMPlOGOngKH3mj4pVLcG",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Late to the Party",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "latetotheparty|7E2aQQjErJocovYFjYLzWU|177176",
  song: "song/emei-late-to-the-party",
} as const satisfies Track
