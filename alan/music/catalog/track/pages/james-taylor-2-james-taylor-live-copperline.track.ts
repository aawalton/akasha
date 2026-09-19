import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveCopperline = {
  id: "01a0abeb-3e5b-76b2-ad9c-cb671499543a",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-copperline",
  ownLength: 4.654433333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3GuCDFyTO1FDhWgbhCkg0A",
      externalLink: "https://open.spotify.com/track/3GuCDFyTO1FDhWgbhCkg0A",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Copperline",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "copperline|0vn7UBvSQECKJm2817Yf1P|279266",
  song: "song/james-taylor-copperline",
} as const satisfies Track
