import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOperaWhatsThePoint = {
  id: "01a0c43e-7045-7828-88e3-11d23994ca9f",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-whats-the-point",
  ownLength: 2.729233333333333,
  ownProgress: 0,
  partOfCollections: ["release/emei-night-at-the-opera"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ebdWVa02jyMYOo18PvW0V",
      externalLink: "https://open.spotify.com/track/5ebdWVa02jyMYOo18PvW0V",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "What's the Point!",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "whatsthepoint|7E2aQQjErJocovYFjYLzWU|163754",
  song: "song/emei-whats-the-point",
} as const satisfies Track
