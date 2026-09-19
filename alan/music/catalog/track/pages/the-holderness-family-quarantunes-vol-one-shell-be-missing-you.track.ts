import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneShellBeMissingYou = {
  id: "01a0b4c6-cb79-70d5-8783-2b869bc893b8",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-shell-be-missing-you",
  ownLength: 3.1743,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "44wKstbNKVptFK0KDcLIB2",
      externalLink: "https://open.spotify.com/track/44wKstbNKVptFK0KDcLIB2",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "She'll Be Missing You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "shellbemissingyou|6tITG4T8LpC0msapZ4wXGA|190458",
  song: "song/the-holderness-family-shell-be-missing-you",
} as const satisfies Track
