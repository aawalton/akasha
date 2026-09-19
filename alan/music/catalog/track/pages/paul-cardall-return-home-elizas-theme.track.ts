import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeElizasTheme = {
  id: "01a0b4c8-2941-7ee7-ad91-8848583658a9",
  type: "page-type/track",
  slug: "paul-cardall-return-home-elizas-theme",
  ownLength: 3.646933333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-return-home"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5dphfMsZtzOBHkDnAIOSZK",
      externalLink: "https://open.spotify.com/track/5dphfMsZtzOBHkDnAIOSZK",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Eliza's Theme",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "elizastheme|7FQRbf8gbKw8KZQZAJWxH2|218816",
  song: "song/paul-cardall-elizas-theme",
} as const satisfies Track
