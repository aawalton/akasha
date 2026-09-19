import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallElizaSThemeElizasTheme = {
  id: "01a0b4c8-68c3-7501-a1ab-273d1f36c786",
  type: "page-type/track",
  slug: "paul-cardall-eliza-s-theme-elizas-theme",
  ownLength: 3.646933333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-eliza-s-theme"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1GGltWuBsYTOHiTrRHjc8b",
      externalLink: "https://open.spotify.com/track/1GGltWuBsYTOHiTrRHjc8b",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Eliza's Theme",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "elizastheme|7FQRbf8gbKw8KZQZAJWxH2|218816",
  song: "song/paul-cardall-elizas-theme",
} as const satisfies Track
