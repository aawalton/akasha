import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveShedALittleLight = {
  id: "01a0abeb-3c5c-70c3-8c4a-bcd4cc02c3d0",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-shed-a-little-light",
  ownLength: 4.268883333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2HBZXNL42YtnkERUEJRRto",
      externalLink: "https://open.spotify.com/track/2HBZXNL42YtnkERUEJRRto",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Shed a Little Light",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "shedalittlelight|0vn7UBvSQECKJm2817Yf1P|256133",
  song: "song/james-taylor-shed-a-little-light",
} as const satisfies Track
