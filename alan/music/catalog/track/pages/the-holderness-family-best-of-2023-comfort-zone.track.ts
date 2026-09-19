import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyBestOf2023ComfortZone = {
  id: "01a0b4c6-c75a-7fa3-b191-53602c771eb5",
  type: "page-type/track",
  slug: "the-holderness-family-best-of-2023-comfort-zone",
  ownLength: 1.892,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-best-of-2023"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3bjHRhjP7fIz83k2Jrg7IO",
      externalLink: "https://open.spotify.com/track/3bjHRhjP7fIz83k2Jrg7IO",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Comfort Zone",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "comfortzone|6tITG4T8LpC0msapZ4wXGA|113520",
  song: "song/the-holderness-family-comfort-zone",
} as const satisfies Track
